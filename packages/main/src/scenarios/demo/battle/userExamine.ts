import { logerror } from '@text-game/shared/Logger';
import { buildMessage } from '../../_utils/buildMessage';
import { ScenarioHandler } from '../../ScenarioHandler';
import { Enemy } from './Enemy';
import { enemiesTurn } from './enemiesTurn';

export const userExamine: ScenarioHandler = async (userInfo, { enemy }: { enemy?: Enemy; } = {}) => {
  if (enemy == null) throw new Error('Enemy is null');

  const text = `${enemy.type === 'Rat' ? 'Обычная крыса.\n' : '???\n'}`
    + ` * Очки здоровья(❤️) - ${enemy.healthPoints}\n`
    + ` * Сила удара(🗡) - ${enemy.attack}\n`;

  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('Demo::battle::userAttack', error);
  }

  return enemiesTurn(userInfo);
};
