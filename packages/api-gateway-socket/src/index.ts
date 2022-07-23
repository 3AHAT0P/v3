import { loginfo, logerror } from '@text-game/shared/Logger';

import { initProviders } from './providers/index';

import { runSocketServer } from './socket';
import { onExit } from './onExit';

const main = async () => {
  try {
    await initProviders();

    runSocketServer();

    process.on('exit', onExit);
  } catch (error) {
    logerror('main::catch', error);
  }
};

main().finally(() => loginfo('main::finally', 'FINAL!'));
