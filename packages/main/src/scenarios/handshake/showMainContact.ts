import { logerror } from '@text-game/shared/Logger';

import { ScenarioHandler } from '../ScenarioHandler';
import { buildMessage } from '../_utils/buildMessage';

import { returnToGreeting } from './returnToGreeting';

export const showMainContact: ScenarioHandler = async (userInfo) => {
  const text = `Написать автору отзыв/идею/предложение\n${'some contact from env'}`;
  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('showMainContact', error);
  }
  return returnToGreeting(userInfo);
};
