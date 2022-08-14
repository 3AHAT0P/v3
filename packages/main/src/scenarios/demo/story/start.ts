import { MessageAnswer } from '../../_utils/MessageAnswer';
import { buildMessage } from '../../_utils/buildMessage';
import { buildActLayout } from '../../_utils/buildActLayout';
import { ScenarioHandler } from '../../ScenarioHandler';

export const start: ScenarioHandler = async (userInfo) => {
  const text = 'БЕРИ МЕЧ И РУБИ!';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'ВЗЯТЬ МЕЧ'],
      ['2', 'OTHER', 'ПОПЫТАТЬСЯ ОСМОТРЕТЬСЯ'],
    ],
  ];

  userInfo.router.clear();
  userInfo.router.register('1', 'DEMO.STORY.TAKE_SWORD');
  userInfo.router.register('2', 'DEMO.STORY.LOOK_AROUND');

  return buildMessage(text, buildActLayout(answers));
};
