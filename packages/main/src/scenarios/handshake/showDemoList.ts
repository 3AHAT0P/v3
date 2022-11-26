import { MessageAnswer } from '../_utils/MessageAnswer';
import { buildMessage } from '../_utils/buildMessage';
import { buildActLayout } from '../_utils/buildActLayout';
import { registerRouteAndReturnMessageAnswer } from '../_utils/registerRouteAndReturnMessageAnswer';
import { ScenarioHandler } from '../ScenarioHandler';
import { demoList } from '../demo';

export const showDemoList: ScenarioHandler = async (userInfo) => {
  const text = 'Вот список демонстрационных материалов возможности движка.';
  const answers: MessageAnswer[][] = [];
  userInfo.router.clear();

  const register = registerRouteAndReturnMessageAnswer(userInfo.router);

  for (let index = 0; index < demoList.length; index += 2) {
    const actions: MessageAnswer[] = [];
    {
      const [routeName, actionName] = demoList[index];

      actions.push(register(index + 1, routeName)('OTHER', actionName));
    }
    if ((index + 1) < demoList.length) {
      const [routeName, actionName] = demoList[index + 1];

      actions.push(register(index + 2, routeName)('OTHER', actionName));
    }
    answers.push(actions);
  }

  {
    const handshakeReturnToGreetingRouteMeta = ['HANDSHAKE.RETURN_TO_GREETING', 'Назад'];
    const [routeName, actionName] = handshakeReturnToGreetingRouteMeta;
    answers.push([register(demoList.length + 1, routeName)('BACK', actionName)]);
  }

  return buildMessage(text, buildActLayout(answers));
};
