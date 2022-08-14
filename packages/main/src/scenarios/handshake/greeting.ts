import { logerror } from '@text-game/shared/Logger';

import { ScenarioHandler } from '../ScenarioHandler';
import { buildMessage } from '../_utils/buildMessage';

import { returnToGreeting } from './returnToGreeting';

export const greeting: ScenarioHandler = async (userInfo) => {
  const text = 'Привет!\nЯ рассказчик одной маленькой текстовой РПГ.';
  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('greeting', error);
  }

  return returnToGreeting(userInfo);
};
