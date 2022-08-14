import { MessageAnswer } from '../../_utils/MessageAnswer';
import { buildMessage } from '../../_utils/buildMessage';
import { buildActLayout } from '../../_utils/buildActLayout';
import { ScenarioHandler } from '../../ScenarioHandler';

export const finish: ScenarioHandler = async (userInfo) => {
  const text = 'Ну и что дальше?';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'Перезагрузить локацию'],
      ['2', 'OTHER', 'Вернутся к выбору локаций'],
    ],
  ];

  userInfo.router.clear();
  userInfo.router.register('1', 'DEMO.STORY.START');
  userInfo.router.register('2', 'HANDSHAKE.DEMO.SHOW_LIST');

  return buildMessage(text, buildActLayout(answers));
};
