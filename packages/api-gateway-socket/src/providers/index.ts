import { init as initConfigProvider } from './config';
import { init as initAMQPProvider } from './amqp';

const providers = <const>[
  initConfigProvider,
  initAMQPProvider,
];

export const initProviders = async () => {
  for (const initProvider of providers) await initProvider();
};
