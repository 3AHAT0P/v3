import { logerror } from '@text-game/shared/Logger';
import { buildMessage } from '../../_utils/buildMessage';
import { ScenarioHandler } from '../../ScenarioHandler';
import { mainLoop } from './mainLoop';

export const start: ScenarioHandler = async (userInfo) => {
  const text = 'Ты встретил '
    + 'одну крысу. '
    + 'У нее очень голодный взгляд, а ты выглядишь весьма аппетитно.';

  if (!userInfo.hasStateFor('DEMO.BATTLE')) userInfo.setStateFor('DEMO.BATTLE', {});
  const state = userInfo.getStateFor<any>('DEMO.BATTLE');

  state.user = {
    healthPoints: 20, attack: 3,
  };
  state.currentBattle = {
    enemies: [{ type: 'Rat', healthPoints: 10, attack: 2 }],
  };

  try {
    await userInfo.sendMessage(buildMessage(text, []));
  } catch (error) {
    logerror('Demo::battle:start', error);
  }

  return mainLoop(userInfo);
};
