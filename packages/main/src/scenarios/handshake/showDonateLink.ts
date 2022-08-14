import { logerror } from '@text-game/shared/Logger';

import { buildMessage } from '../_utils/buildMessage';
import { ScenarioHandler } from '../ScenarioHandler';

import { returnToGreeting } from './returnToGreeting';

export const showDonateLink: ScenarioHandler = async (userInfo) => {
  const text = `Поддержать проект (RUB)\n${'some link from env'}`;
  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('showDonateLink', error);
  }
  return returnToGreeting(userInfo);
};
