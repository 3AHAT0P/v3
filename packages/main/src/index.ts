import { loginfo, logerror } from '@text-game/shared/Logger';

import { initProviders } from './providers/index';

import { run } from './run';
import { onExit } from './onExit';

const main = async () => {
  try {
    process.on('exit', onExit);

    await initProviders();

    await run();

    loginfo('main', ' [*] Waiting for messages. To exit press CTRL+C');
  } catch (error: unknown) {
    logerror('main::catch', error);
  }
};

main().finally(() => loginfo('main::finally', 'FINAL!'));
