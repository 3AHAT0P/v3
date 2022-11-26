/* eslint-disable no-param-reassign */
import { logerror } from '@text-game/shared/Logger';

import { MessageAnswer } from '../../_utils/MessageAnswer';
import { buildMessage } from '../../_utils/buildMessage';
import { buildActLayout } from '../../_utils/buildActLayout';
import { registerRouteAndReturnMessageAnswer } from '../../_utils/registerRouteAndReturnMessageAnswer';
import { ScenarioHandler } from '../../ScenarioHandler';

import { RouteResolver } from '../../RouteResolver';

interface Enemy {
  type: string;
  healthPoints: number;
  attack: number;
}

const finish: ScenarioHandler = async (userInfo) => {
  const text = 'Ну и что дальше?';
  userInfo.router.clear();

  const register = registerRouteAndReturnMessageAnswer(userInfo.router);

  const answers: MessageAnswer[][] = [
    [
      register(1, 'DEMO.BATTLE.START')('OTHER', 'Перезагрузить локацию'),
      register(2, 'HANDSHAKE.SHOW_DEMO_LIST')('OTHER', 'Вернутся к выбору локаций'),
    ],
  ];

  return buildMessage(text, buildActLayout(answers));
};

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
  userInfo.router.register('3', 'DEMO.BATTLE.TRY_TO_LEAVE');

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
  userInfo.router.clear();
  const register = registerRouteAndReturnMessageAnswer(userInfo.router);

  const answers: MessageAnswer[][] = [];

  // eslint-disable-next-line prefer-destructuring
  const enemies: Array<Enemy> = userInfo.userState.currentBattle.enemies;
  for (let index = 0; index < enemies.length; index += 2) {
    const actions: MessageAnswer[] = [];
    {
      const enemy = enemies[index];
      actions.push(
        register(
          index + 1, 'DEMO.BATTLE.USER_ATTACK', { enemy },
        )(
          `ATTACK_${index + 1}`, `Атаковать #${index + 1} (${enemy.type === 'Rat' ? 'крыса' : '???'})`,
        ),
      );
    }
    if ((index + 1) < enemies.length) {
      const enemy = enemies[index + 1];
      actions.push(
        register(
          index + 2, 'DEMO.BATTLE.USER_ATTACK', { enemy },
        )(
          `ATTACK_${index + 2}`, `Атаковать #${index + 2} (${enemy.type === 'Rat' ? 'крыса' : '???'})`,
        ),
      );
    }
    answers.push(actions);
  }

  answers.push([register(enemies.length + 1, 'DEMO.BATTLE.MAIN')('BACK', 'Я передумал')]);

  return buildMessage(text, buildActLayout(answers));
};

export const userAttack: ScenarioHandler = async (userInfo, { enemy }: { enemy?: Enemy } = {}) => {
  if (enemy == null) throw new Error('Enemy is null');

  enemy.healthPoints -= userInfo.userState.user.attack;
  let text = `Ты нанес крысе ${userInfo.userState.user.attack as number} урона.`;
  if (enemy.healthPoints <= 0) {
    text += ' И убил ее!';
    const index = userInfo.userState.currentBattle.enemies.indexOf(enemy);
    userInfo.userState.currentBattle.enemies.splice(index, 1);
  } else {
    text += ` У нее осталось ${enemy.healthPoints} ОЗ.`;
  }

  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('Demo::battle::userAttack', error);
  }

  return enemiesTurn(userInfo);
};

export const enemiesTurn: ScenarioHandler = async (userInfo) => {
  if (userInfo.userState.currentBattle.enemies.length === 0) return finish(userInfo);

  let text: string = 'Ход соперников:\n';

  // eslint-disable-next-line prefer-destructuring
  const enemies: Array<Enemy> = userInfo.userState.currentBattle.enemies;
  for (let index = 0; index < enemies.length; index += 1) {
    const enemy = enemies[index];
    userInfo.userState.user.healthPoints -= enemy.attack;
    text += `${enemy.type === 'Rat' ? 'крыса' : '???'} нанесла тебе ${enemy.attack} урона.`
      + ` У тебя осталось ${userInfo.userState.user.healthPoints as number}ОЗ`;
  }

  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('Demo::battle:enemiesTurn', error);
  }

  if (userInfo.userState.user.healthPoints <= 0) {
    try {
      await userInfo.sendMessage(buildMessage('В этой неравной схватке, ты не сдюжил. Ты мертв.', []));
    } catch (error) {
      logerror('Demo::battle:enemiesTurn', error);
    }
    return finish(userInfo);
  }

  return mainLoop(userInfo);
};

export const showEnemiesForExamine: ScenarioHandler = async (userInfo) => {
  // const text = 'Кого?';
  // userInfo.router.clear();
  // const register = registerRouteAndReturnMessageAnswer(userInfo.router);

  // const answers: MessageAnswer[][] = [];

  // // eslint-disable-next-line prefer-destructuring
  // const enemies: Array<Enemy> = userInfo.userState.currentBattle.enemies;
  // for (let index = 0; index < enemies.length; index += 2) {
  //   const actions: MessageAnswer[] = [];
  //   {
  //     const enemy = enemies[index];
  //     actions.push(
  //       register(
  //         index + 1, 'DEMO.BATTLE.USER_EXAMINE', { enemy },
  //       )(
  //         `EXAMINE_${index + 1}`, `Осмотреть #${index + 1} (${enemy.type === 'Rat' ? 'крыса' : '???'})`,
  //       ),
  //     );
  //   }
  //   if ((index + 1) < enemies.length) {
  //     const enemy = enemies[index + 1];
  //     actions.push(
  //       register(
  //         index + 2, 'DEMO.BATTLE.USER_EXAMINE', { enemy },
  //       )(
  //         `EXAMINE_${index + 2}`, `Осмотреть #${index + 2} (${enemy.type === 'Rat' ? 'крыса' : '???'})`,
  //       ),
  //     );
  //   }
  //   answers.push(actions);
  // }

  // answers.push([register(enemies.length + 1, 'DEMO.BATTLE.MAIN')('BACK', 'Я передумал')]);

  try {
    await userInfo.sendMessage(buildMessage('Эта часть еще не реализована.', []));
  } catch (error) {
    logerror('Demo::battle:showEnemiesForExamine', error);
  }

  return mainLoop(userInfo);
};

export const tryToLeave: ScenarioHandler = async (userInfo) => {
  const text = 'Ты начинаешь пятиться, но спотыкаешься о камень.'
    + ' Падая, ты замечаешь как твои враги набросились на тебя.'
    + ' Страх и адская боль от того что тебя разрывают на части - это последнее, что ты успел ощутить...';

  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('Demo::battle:tryToLeave', error);
  }

  return finish(userInfo);
};

const registry: Readonly<Record<string, ScenarioHandler>> = {
  START: start,
  MAIN: mainLoop,
  SHOW_ENEMIES_FOR_ATTACK: showEnemiesForAttack,
  SHOW_ENEMIES_FOR_EXAMINE: showEnemiesForExamine,
  USER_ATTACK: userAttack,
  TRY_TO_LEAVE: tryToLeave,
};

export const resolver: RouteResolver = (name: string): ScenarioHandler => {
  if (name in registry) return registry[name];

  throw new Error(`Handler name is incorrect (${name})`);
};
