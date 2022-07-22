import { inject } from '@text-game/shared/DIContainer';
import { loginfo, logerror } from '@text-game/shared/Logger';

import { initAMQPProvider, initConfigProvider } from './providers/index';
import { amqpAdapterInjectionToken } from './providers/amqp';
import { configInjectionToken } from './providers/config';

import { listen } from './socket';

const main = async () => {
  try {
    initConfigProvider();
    const config = inject(configInjectionToken);
    await initAMQPProvider(config.messageBrokerPath);

    listen();

    process.on('exit', (code) => {
      const adapter = inject(amqpAdapterInjectionToken);
      adapter.destructor().catch((error) => logerror('PROCESS::EXIT', error));
      loginfo('PROCESS::EXIT', 'Process exit event with code: ', code);
    });
  } catch (error) {
    logerror('main::catch', error);
    throw new Error('!');
  }
};

main().finally(() => loginfo('main::finally', 'FINAL!'));
