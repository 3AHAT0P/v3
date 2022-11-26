import { MessageAnswer } from '../../_utils/MessageAnswer';
import { buildMessage } from '../../_utils/buildMessage';
import { buildActLayout } from '../../_utils/buildActLayout';
import { registerRouteAndReturnMessageAnswer } from '../../_utils/registerRouteAndReturnMessageAnswer';
import { ScenarioHandler } from '../../ScenarioHandler';

export const start: ScenarioHandler = async (userInfo) => {
  const text = 'БЕРИ МЕЧ И РУБИ!';
  userInfo.router.clear();

  const register = registerRouteAndReturnMessageAnswer(userInfo.router);

  const answers: MessageAnswer[][] = [
    [
      register(1, 'DEMO.STORY.TAKE_SWORD')('OTHER', 'ВЗЯТЬ МЕЧ'),
      register(2, 'DEMO.STORY.LOOK_AROUND')('OTHER', 'ПОПЫТАТЬСЯ ОСМОТРЕТЬСЯ'),
    ],
  ];

  return buildMessage(text, buildActLayout(answers));
};
