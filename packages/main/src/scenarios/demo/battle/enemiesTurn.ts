import { logerror } from '@text-game/shared/Logger';
import { buildMessage } from '../../_utils/buildMessage';
import { ScenarioHandler } from '../../ScenarioHandler';

import type { Enemy } from './Enemy';
import { finish } from './finish';
import { mainLoop } from './mainLoop';

export const enemiesTurn: ScenarioHandler = async (userInfo) => {
  const state = userInfo.getStateFor<any>('DEMO.BATTLE');

  if (state.currentBattle.enemies.length === 0) return finish(userInfo);

  let text: string = 'Ход соперников:\n';

  // eslint-disable-next-line prefer-destructuring
  const enemies: Array<Enemy> = state.currentBattle.enemies;
  for (let index = 0; index < enemies.length; index += 1) {
    const enemy = enemies[index];
    state.user.healthPoints -= enemy.attack;
    text += `${enemy.type === 'Rat' ? 'крыса' : '???'} нанесла тебе ${enemy.attack} урона.`
      + ` У тебя осталось ${state.user.healthPoints as number}ОЗ`;
  }

  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('Demo::battle:enemiesTurn', error);
  }

  if (state.user.healthPoints <= 0) {
    try {
      await userInfo.sendMessage(buildMessage('В этой неравной схватке, ты не сдюжил. Ты мертв.', []));
    } catch (error) {
      logerror('Demo::battle:enemiesTurn', error);
    }
    return finish(userInfo);
  }

  return mainLoop(userInfo);
};
