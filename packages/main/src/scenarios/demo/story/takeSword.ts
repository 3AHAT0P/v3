import { MessageAnswer } from '../../_utils/MessageAnswer';
import { buildMessage } from '../../_utils/buildMessage';
import { buildActLayout } from '../../_utils/buildActLayout';
import { ScenarioHandler } from '../../ScenarioHandler';

export const takeSword: ScenarioHandler = async (userInfo) => {
  const text = 'Ладонь сжимает рукоять меча - шершавую и тёплую.';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'РУБИТЬ'],
      ['2', 'OTHER', 'ПОПЫТАТЬСЯ ОСМОТРЕТЬСЯ'],
    ],
  ];

  userInfo.router.clear();
  userInfo.router.register('1', 'DEMO.STORY.CHOP');
  userInfo.router.register('2', 'DEMO.STORY.LOOK_AROUND');

  return buildMessage(text, buildActLayout(answers));
};
