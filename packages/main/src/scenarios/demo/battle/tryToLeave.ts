import { logerror } from '@text-game/shared/Logger';
import { buildMessage } from '../../_utils/buildMessage';
import { ScenarioHandler } from '../../ScenarioHandler';
import { finish } from './finish';

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
