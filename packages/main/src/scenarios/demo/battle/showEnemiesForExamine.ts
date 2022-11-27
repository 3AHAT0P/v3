import { MessageAnswer } from '../../_utils/MessageAnswer';
import { buildMessage } from '../../_utils/buildMessage';
import { buildActLayout } from '../../_utils/buildActLayout';
import { registerRouteAndReturnMessageAnswer } from '../../_utils/registerRouteAndReturnMessageAnswer';
import { ScenarioHandler } from '../../ScenarioHandler';
import { Enemy } from './Enemy';

export const showEnemiesForExamine: ScenarioHandler = async (userInfo) => {
  const state = userInfo.getStateFor<any>('DEMO.BATTLE');

  const text = 'Кого?';
  userInfo.router.clear();
  const register = registerRouteAndReturnMessageAnswer(userInfo.router);

  const answers: MessageAnswer[][] = [];

  // eslint-disable-next-line prefer-destructuring
  const enemies: Array<Enemy> = state.currentBattle.enemies;
  for (let index = 0; index < enemies.length; index += 2) {
    const actions: MessageAnswer[] = [];
    {
      const enemy = enemies[index];
      actions.push(
        register(
          index + 1, 'DEMO.BATTLE.USER_EXAMINE', { enemy },
        )(
          `EXAMINE_${index + 1}`, `Осмотреть #${index + 1} (${enemy.type === 'Rat' ? 'крыса' : '???'})`,
        ),
      );
    }
    if ((index + 1) < enemies.length) {
      const enemy = enemies[index + 1];
      actions.push(
        register(
          index + 2, 'DEMO.BATTLE.USER_EXAMINE', { enemy },
        )(
          `EXAMINE_${index + 2}`, `Осмотреть #${index + 2} (${enemy.type === 'Rat' ? 'крыса' : '???'})`,
        ),
      );
    }
    answers.push(actions);
  }

  answers.push([register(enemies.length + 1, 'DEMO.BATTLE.MAIN')('BACK', 'Я передумал')]);

  return buildMessage(text, buildActLayout(answers));
};
