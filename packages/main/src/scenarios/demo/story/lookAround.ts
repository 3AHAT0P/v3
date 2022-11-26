import { logerror } from '@text-game/shared/Logger';

import { buildMessage } from '../../_utils/buildMessage';
import { ScenarioHandler } from '../../ScenarioHandler';

import { finish } from './finish';

export const lookAround: ScenarioHandler = async (userInfo) => {
  const text = 'Серый песок, фиолетовое небо, и расплывчатый клинок, торчащий из твоей грудины.\n'
    + 'Времени не было уже секунду назад; сейчас последние секунды с кровью утекают в песок.\n'
    + 'Вы проиграли';

  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('Demo::story:lookAround', error);
  }

  return finish(userInfo);
};
