import { MessageAnswer } from '../../_utils/MessageAnswer';
import { buildMessage } from '../../_utils/buildMessage';
import { buildActLayout } from '../../_utils/buildActLayout';
import { registerRouteAndReturnMessageAnswer } from '../../_utils/registerRouteAndReturnMessageAnswer';
import type { ScenarioHandler } from '../../ScenarioHandler';

export const mainLoop: ScenarioHandler = async (userInfo) => {
  const text = 'Твои действия?';
  userInfo.router.clear();

  const register = registerRouteAndReturnMessageAnswer(userInfo.router);

  const answers: MessageAnswer[][] = [
    [
      register(1, 'DEMO.BATTLE.SHOW_ENEMIES_FOR_ATTACK')('ATTACK', 'Атаковать'),
      register(2, 'DEMO.BATTLE.SHOW_ENEMIES_FOR_EXAMINE')('EXAMINE', 'Присмотреться'),
    ],
    [
      register(3, 'DEMO.BATTLE.TRY_TO_LEAVE')('BATTLE_LEAVE', 'Убежать'),
    ],
  ];

  return buildMessage(text, buildActLayout(answers));
};
