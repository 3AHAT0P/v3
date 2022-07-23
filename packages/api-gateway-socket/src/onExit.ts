import { inject } from '@text-game/shared/DIContainer';
import { loginfo, logerror } from '@text-game/shared/Logger';

import { amqpAdapterInjectionToken } from './providers/amqp';

const adapterCatch = (error: any) => logerror('PROCESS::EXIT:Adapter', error);

export const onExit = (code: number) => {
  inject(amqpAdapterInjectionToken)
    .destructor()
    .catch(adapterCatch);

  loginfo('PROCESS::EXIT', 'Process exit event with code: ', code);
};
