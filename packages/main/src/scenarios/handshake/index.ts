import { logerror } from '@text-game/shared/Logger';
import { ActionToClient } from '@text-game/shared/APIGatewayShared';

import { ClientRecord } from '@/ClientRecord';

import { MessageAnswer } from '../_utils/MessageAnswer';
import { buildMessage } from '../_utils/buildMessage';
import { buildActLayout } from '../_utils/buildActLayout';

export const greeting = async (userInfo: ClientRecord): Promise<ActionToClient> => {
  const text = 'Привет!\nЯ рассказчик одной маленькой текстовой РПГ.';
  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('greeting', error);
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return returnToGreeting(userInfo);
};

export const returnToGreeting = async (userInfo: ClientRecord): Promise<ActionToClient> => {
  const text = 'Что тебе интересно?';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'Перейти к демкам'],
    ],
    [
      ['2', 'DONATE_LINK', 'Поддержать проект (RUB)'],
      ['3', 'MAIN_CONTACT', 'Написать автору отзыв/идею/предложение'],
    ],
  ];

  userInfo.clearHandlers();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  userInfo.registerHandler('1', showDemoList);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  userInfo.registerHandler('2', showDonateLink);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  userInfo.registerHandler('3', showMainContact);

  return buildMessage(text, buildActLayout(answers));
};

const showDemoList = async (userInfo: ClientRecord): Promise<ActionToClient> => {
  const text = 'Вот список демонстрационных материалов возможности движка.';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'Попробовать демо сюжет'],
      ['2', 'OTHER', 'Попробовать демо бой'],
      ['3', 'OTHER', 'Попробовать демо общение с NPC'],
      ['4', 'OTHER', 'Попробовать демо локацию'],
    ],
    [
      ['5', 'BACK', 'Назад'],
    ],
  ];

  userInfo.clearHandlers();
  // @TODO:
  // userInfo.registerHandler('1', startDemoStory);
  // userInfo.registerHandler('2', startDemoBattle);
  // userInfo.registerHandler('3', StartDemoNPC);
  // userInfo.registerHandler('4', startDemoLocation);
  userInfo.registerHandler('5', returnToGreeting);

  return buildMessage(text, buildActLayout(answers));
};

export const showDonateLink = async (userInfo: ClientRecord): Promise<ActionToClient> => {
  const text = `Поддержать проект (RUB)\n${'some link from env'}`;
  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('showDonateLink', error);
  }
  return returnToGreeting(userInfo);
};

export const showMainContact = async (userInfo: ClientRecord): Promise<ActionToClient> => {
  const text = `Написать автору отзыв/идею/предложение\n${'some contact from env'}`;
  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('showMainContact', error);
  }
  return returnToGreeting(userInfo);
};

/*
TODO:
1) возможно проблема когда пользователь несколько раз нажал кнопку нак фронте
1) Хочу переделать так, чтобы инициатором был клиент,
  а на сервере не было бы никакого сохраненного состояния (только в бд)
1) Сейчас возможны утечки памяти
1) каждый обработчик помимо вывода сообщения, может делать некоторую логику.
  Сообщение же в своб очередь является концом действия. После сообщения идет выбор пользователя.
1) нужно создать провайдер - контейнер в который будут регистрироваться все обработчики.
  а registerHandler будет принимать не саму функцию а ее id из этого провайдера
*/
