import { MessageAnswer } from '../../_utils/MessageAnswer';
import { buildMessage } from '../../_utils/buildMessage';
import { buildActLayout } from '../../_utils/buildActLayout';
import { registerRouteAndReturnMessageAnswer } from '../../_utils/registerRouteAndReturnMessageAnswer';
import { ScenarioHandler } from '../../ScenarioHandler';

export const takeSword: ScenarioHandler = async (userInfo) => {
  const text = 'Ладонь сжимает рукоять меча - шершавую и тёплую.';
  userInfo.router.clear();

  const register = registerRouteAndReturnMessageAnswer(userInfo.router);

  const answers: MessageAnswer[][] = [
    [
      register(1, 'DEMO.STORY.CHOP')('OTHER', 'РУБИТЬ'),
      register(2, 'DEMO.STORY.LOOK_AROUND')('OTHER', 'ПОПЫТАТЬСЯ ОСМОТРЕТЬСЯ'),
    ],
  ];

  return buildMessage(text, buildActLayout(answers));
};
