import { logerror } from '@text-game/shared/Logger';
import { ActionToClient } from '@text-game/shared/APIGatewayShared';
import { ActionType, UserAction } from '@text-game/shared/Main/Action';

import { ClientRecord } from '@/ClientRecord';

type MessageAnswer = [id: string, type: ActionType, text: string, next: string];

const buildMessage = (text: string, userActLayout?: UserAction[][]): ActionToClient => ({
  text,
  needAnswer: userActLayout != null,
  userActLayout: userActLayout ?? [],
});

const buildActLayout = (userActLayout: MessageAnswer[][]): Array<Array<UserAction>> => userActLayout.map(
  (line) => line.map(([id, type, text]) => ({ id, text, type })),
);

const getAnswerNext = (answer: MessageAnswer): string => answer[3];

const findAnswerById = (userActLayout: MessageAnswer[][], id: string): MessageAnswer => {
  const action = userActLayout.flat().find(([_id]) => _id === id);
  if (action != null) return action;

  logerror('findActionById', `Answer id is incorrect (#${id})`, userActLayout);
  throw new Error(`Answer id is incorrect (#${id})`);
};

const greeting = async (client: ClientRecord): Promise<string> => {
  const text = 'Привет!\nЯ рассказчик одной маленькой текстовой РПГ.\nЧто тебе интересно?';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'Перейти к демкам', 'SHOW_DEMO_LIST'],
    ],
    [
      ['2', 'DONATE_LINK', 'Поддержать проект (RUB)', 'SHOW_DONATE_LINK'],
      ['3', 'MAIN_CONTACT', 'Написать автору отзыв/идею/предложение', 'SHOW_MAIN_CONTACT'],
    ],
  ];

  await client.sendMessage(buildMessage(text, buildActLayout(answers)));

  const answer = await client.recievedMessageQueue.getNextMessage();
  const action = getAnswerNext(findAnswerById(answers, answer.action));

  return action;
};

const returnToGreeting = async (client: ClientRecord): Promise<string> => {
  const text = 'Что тебе интересно?';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'Перейти к демкам', 'SHOW_DEMO_LIST'],
    ],
    [
      ['2', 'DONATE_LINK', 'Поддержать проект (RUB)', 'SHOW_DONATE_LINK'],
      ['3', 'MAIN_CONTACT', 'Написать автору отзыв/идею/предложение', 'SHOW_MAIN_CONTACT'],
    ],
  ];

  await client.sendMessage(buildMessage(text, buildActLayout(answers)));

  const answer = await client.recievedMessageQueue.getNextMessage();
  const action = getAnswerNext(findAnswerById(answers, answer.action));

  return action;
};

const showDemoList = async (client: ClientRecord): Promise<string> => {
  const text = 'Вот список демонстрационных материалов возможности движка.';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'Попробовать демо сюжет', 'START_DEMO_STORY'],
      ['2', 'OTHER', 'Попробовать демо бой', 'START_DEMO_BATTLE'],
      ['3', 'OTHER', 'Попробовать демо общение с NPC', 'START_DEMO_NPC'],
      ['4', 'OTHER', 'Попробовать демо локацию', 'START_DEMO_LOCATION'],
    ],
    [
      ['5', 'BACK', 'Назад', 'RETURN_TO_GREETING'],
    ],
  ];

  await client.sendMessage(buildMessage(text, buildActLayout(answers)));

  const answer = await client.recievedMessageQueue.getNextMessage();
  const action = getAnswerNext(findAnswerById(answers, answer.action));

  return action;
};

const hash: Record<string, (client: ClientRecord) => Promise<string>> = {
  GREETING: greeting,
  RETURN_TO_GREETING: returnToGreeting,
  SHOW_DEMO_LIST: showDemoList,
};

export const run = async (client: ClientRecord): Promise<void> => {
  while (true) {
    if (!(client.currentNode in hash)) {
      logerror(
        'ScenarioRunner',
        `client.currentNode is incorrect (#${client.currentNode})`,
        hash,
      );
      throw new Error(`client.currentNode is incorrect (#${client.currentNode})`);
    }

    try {
      // eslint-disable-next-line no-param-reassign
      client.currentNode = await hash[client.currentNode](client);
    } catch (error) {
      logerror(
        'ScenarioRunner',
        'Potential memory leak, because',
        error,
      );
    }
  }
};

/*
TODO:
1) возможно проблема когда пользователь несколько раз нажал кнопку нак фронте
1) Хочу переделать так, чтобы инициатором был клиент,
  а на сервере не было бы никакого сохраненного состояния (только в бд)
1) Сейчас возможны утечки памяти
1) каждый обработчик помимо вывода сообщения, может делать некоторую логику.
  Сообщение же в своб очередь является концом действия. После сообщения идет выбор пользователя.
*/
