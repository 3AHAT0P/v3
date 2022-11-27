import { MessageAnswer } from '../../_utils/MessageAnswer';
import { buildMessage } from '../../_utils/buildMessage';
import { buildActLayout } from '../../_utils/buildActLayout';
import { registerRouteAndReturnMessageAnswer } from '../../_utils/registerRouteAndReturnMessageAnswer';
import { ScenarioHandler } from '../../ScenarioHandler';

export const finish: ScenarioHandler = async (userInfo) => {
  const text = 'Ну и что дальше?';
  userInfo.router.clear();

  const register = registerRouteAndReturnMessageAnswer(userInfo.router);

  const answers: MessageAnswer[][] = [
    [
      register(1, 'DEMO.BATTLE.START')('OTHER', 'Перезагрузить локацию'),
      register(2, 'HANDSHAKE.SHOW_DEMO_LIST')('OTHER', 'Вернутся к выбору локаций'),
    ],
  ];

  return buildMessage(text, buildActLayout(answers));
};
