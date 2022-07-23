import { inject } from '@text-game/shared/DIContainer';
import { logerror } from '@text-game/shared/Logger';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { configInjectionToken } from '../providers/config';

import { onNewClientConnect } from './onNewClientConnect';

export const listen = () => {
  try {
    const config = inject(configInjectionToken);
    const transport: Server = new Server({
      serveClient: false,
      cors: {
        origin: config.clientLocation,
      },
    });

    transport.on('connection', onNewClientConnect);

    transport.listen(config.wsPort);
    transport.engine.generateId = () => uuidv4();
  } catch (error) {
    logerror('Socket::listen', error);
  }
};
