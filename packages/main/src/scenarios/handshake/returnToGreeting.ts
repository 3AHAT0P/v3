import { MessageAnswer } from '../_utils/MessageAnswer';
import { buildMessage } from '../_utils/buildMessage';
import { buildActLayout } from '../_utils/buildActLayout';
import { registerRouteAndReturnMessageAnswer } from '../_utils/registerRouteAndReturnMessageAnswer';
import { ScenarioHandler } from '../ScenarioHandler';

export const returnToGreeting: ScenarioHandler = async (userInfo) => {
  const text = 'Что тебе интересно?';
  userInfo.router.clear();

  const register = registerRouteAndReturnMessageAnswer(userInfo.router);

  const answers: MessageAnswer[][] = [
    [
      register(1, 'HANDSHAKE.SHOW_DEMO_LIST')('OTHER', 'Перейти к демкам'),
    ],
    [
      register(2, 'HANDSHAKE.SHOW_DONATE_LINK')('DONATE_LINK', 'Поддержать проект (RUB)'),
      register(3, 'HANDSHAKE.SHOW_MAIN_CONTACT')('MAIN_CONTACT', 'Написать автору отзыв/идею/предложение'),

    ],
  ];

  return buildMessage(text, buildActLayout(answers));
};
