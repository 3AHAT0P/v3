import { logerror } from '@text-game/shared/Logger';

import { buildMessage } from '../../_utils/buildMessage';
import { ScenarioHandler } from '../../ScenarioHandler';

import { finish } from './finish';

export const chop: ScenarioHandler = async (userInfo) => {
  const text1 = 'Воздух свистит, рассекаемый сталью, и расплывчатый силуэт перед тобой делает сальто назад.';
  const text2 = 'Продолжение следует...';

  try {
    await userInfo.sendMessage(buildMessage(text1, []));
    await userInfo.sendMessage(buildMessage(text2, []));
  } catch (error) {
    logerror('greeting', error);
  }

  return finish(userInfo);
};
