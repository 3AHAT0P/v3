/* eslint-disable no-param-reassign */
import { logerror } from '@text-game/shared/Logger';

import { MessageAnswer } from '../../_utils/MessageAnswer';
import { buildMessage } from '../../_utils/buildMessage';
import { buildActLayout } from '../../_utils/buildActLayout';
import { ScenarioHandler } from '../../ScenarioHandler';

interface Enemy {
  type: string;
  healthPoints: number;
  attack: number;
}

export const mainLoop: ScenarioHandler = async (userInfo) => {
  const text = 'Твои действия?';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'ATTACK', 'Атаковать'],
      ['2', 'EXAMINE', 'Присмотреться'],
    ],
    [
      ['3', 'BATTLE_LEAVE', 'Убежать'],
    ],
  ];

  userInfo.router.clear();
  userInfo.router.register('1', 'DEMO.BATTLE.SHOW_ENEMIES_FOR_ATTACK');
  userInfo.router.register('2', 'DEMO.BATTLE.SHOW_ENEMIES_FOR_EXAMINE');
  userInfo.router.register('3', 'DEMO.BATTLE.USER_LEAVE');

  return buildMessage(text, buildActLayout(answers));
};

export const start: ScenarioHandler = async (userInfo) => {
  const text = 'Ты встретил '
    + 'одну крысу. '
    + 'У нее очень голодный взгляд, а ты выглядишь весьма аппетитно.';

  // @TODO: Debug only
  userInfo.userState.user = {
    healthPoints: 20, attack: 3,
  };
  userInfo.userState.currentBattle = {
    enemies: [{ type: 'Rat', healthPoints: 10, attack: 2 }],
  };

  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('Demo::battle:start', error);
  }

  return mainLoop(userInfo);
};

export const showEnemiesForAttack: ScenarioHandler = async (userInfo) => {
  const text = 'Кого?';

  let answerIndex = 1;
  const answers: MessageAnswer[][] = [
    userInfo.userState.currentBattle.enemies.map((enemy: any, index: number) => {
      const answerId = answerIndex.toString();
      answerIndex += 1;
      return [answerId, `ATTACK_${index + 1}`, `Атаковать #${index + 1} (${enemy.type === 'Rat' ? 'крыса' : '???'})`];
    }),
    [
      [answerIndex.toString(), 'BACK', 'Я передумал'],
    ],
  ];

  answerIndex = 1;
  userInfo.router.clear();
  userInfo.userState.currentBattle.enemies.forEach((enemy: any) => {
    const answerId = answerIndex.toString();
    answerIndex += 1;
    userInfo.router.register(answerId, 'DEMO.BATTLE.USER_ATTACK', { enemy });
  });
  userInfo.router.register(answerIndex.toString(), 'DEMO.BATTLE.MAIN');

  return buildMessage(text, buildActLayout(answers));
};

export const userAttack: ScenarioHandler = async (userInfo, { enemy }) => {
  const text = `Ты нанес крысе 5 урона`;
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'ВЗЯТЬ МЕЧ'],
      ['2', 'OTHER', 'ПОПЫТАТЬСЯ ОСМОТРЕТЬСЯ'],
    ],
  ];

  userInfo.userState.currentBattle = {

  }

  userInfo.router.clear();
  userInfo.router.register('1', 'DEMO.BATTLE.TAKE_SWORD');
  userInfo.router.register('2', 'DEMO.BATTLE.LOOK_AROUND');

  return buildMessage(text, buildActLayout(answers));
};

export const enemiesTurn: ScenarioHandler = async (userInfo) => {
  const text = 'Загружаю тренировочный бой...';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'ВЗЯТЬ МЕЧ'],
      ['2', 'OTHER', 'ПОПЫТАТЬСЯ ОСМОТРЕТЬСЯ'],
    ],
  ];

  userInfo.userState.currentBattle = {

  }

  userInfo.router.clear();
  userInfo.router.register('1', 'DEMO.BATTLE.TAKE_SWORD');
  userInfo.router.register('2', 'DEMO.BATTLE.LOOK_AROUND');

  return buildMessage(text, buildActLayout(answers));
};

// export const start: ScenarioHandler = async (userInfo) => {
//   const text = 'Загружаю тренировочный бой...';
//   const answers: MessageAnswer[][] = [
//     [
//       ['1', 'OTHER', 'ВЗЯТЬ МЕЧ'],
//       ['2', 'OTHER', 'ПОПЫТАТЬСЯ ОСМОТРЕТЬСЯ'],
//     ],
//   ];

//   userInfo.userState.currentBattle = {

//   }

//   userInfo.router.clear();
//   userInfo.router.register('1', 'DEMO.BATTLE.TAKE_SWORD');
//   userInfo.router.register('2', 'DEMO.BATTLE.LOOK_AROUND');

//   return buildMessage(text, buildActLayout(answers));
// };

