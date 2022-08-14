import { MessageAnswer } from '../_utils/MessageAnswer';
import { buildMessage } from '../_utils/buildMessage';
import { buildActLayout } from '../_utils/buildActLayout';
import { ScenarioHandler } from '../ScenarioHandler';

export const returnToGreeting: ScenarioHandler = async (userInfo) => {
  const text = 'Что тебе интересно?';
  const answers: MessageAnswer[][] = [
    [
      ['1', 'OTHER', 'Перейти к демкам'],
    ],
    [
      ['2', 'DONATE_LINK', 'Поддержать проект (RUB)'],
      ['3', 'MAIN_CONTACT', 'Написать автору отзыв/идею/предложение'],
    ],
  ];

  userInfo.router.clear();
  userInfo.router.register('1', 'HANDSHAKE.DEMO.SHOW_LIST');
  userInfo.router.register('2', 'HANDSHAKE.SHOW_DONATE_LINK');
  userInfo.router.register('3', 'HANDSHAKE.SHOW_MAIN_CONTACT');

  return buildMessage(text, buildActLayout(answers));
};
