import { logerror } from '@text-game/shared/Logger';
import { buildMessage } from '../../_utils/buildMessage';
import { ScenarioHandler } from '../../ScenarioHandler';
import { Enemy } from './Enemy';
import { enemiesTurn } from './enemiesTurn';

export const userAttack: ScenarioHandler = async (userInfo, { enemy }: { enemy?: Enemy; } = {}) => {
  if (enemy == null) throw new Error('Enemy is null');

  const state = userInfo.getStateFor<any>('DEMO.BATTLE');

  // eslint-disable-next-line no-param-reassign
  enemy.healthPoints -= state.user.attack;
  let text = `Ты нанес крысе ${state.user.attack as number} урона.`;
  if (enemy.healthPoints <= 0) {
    text += ' И убил ее!';
    const index = state.currentBattle.enemies.indexOf(enemy);
    state.currentBattle.enemies.splice(index, 1);
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
