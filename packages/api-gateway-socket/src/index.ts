import { loginfo, logerror } from '@text-game/shared/Logger';

import { initProviders } from './providers/index';

import { runSocketServer } from './socket';
import { onExit } from './onExit';

const main = async () => {
  try {
    process.on('exit', onExit);

    await initProviders();

    runSocketServer();
  } catch (error) {
    logerror('main::catch', error);
  }
};

main().finally(() => loginfo('main::finally', 'FINAL!'));
