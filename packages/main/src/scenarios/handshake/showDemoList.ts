import { MessageAnswer } from '../_utils/MessageAnswer';
import { buildMessage } from '../_utils/buildMessage';
import { buildActLayout } from '../_utils/buildActLayout';
import { ScenarioHandler } from '../ScenarioHandler';

export const showDemoList: ScenarioHandler = async (userInfo) => {
  const text = 'Вот список демонстрационных материалов возможности движка.';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'Попробовать демо сюжет'],
      ['2', 'OTHER', 'Попробовать демо бой'],
      ['3', 'OTHER', 'Попробовать демо общение с NPC'],
      ['4', 'OTHER', 'Попробовать демо локацию'],
    ],
    [
      ['5', 'BACK', 'Назад'],
    ],
  ];

  userInfo.router.clear();
  // @TODO:
  userInfo.router.register('1', 'DEMO.STORY.START');
  // userInfo.router.register('2', startDemoBattle);
  // userInfo.router.register('3', StartDemoNPC);
  // userInfo.router.register('4', startDemoLocation);
  userInfo.router.register('5', 'HANDSHAKE.RETURN_TO_GREETING');

  return buildMessage(text, buildActLayout(answers));
};
