import { init as initConfigProvider } from './config';
import { init as initAMQPProvider } from './amqp';
// import { init as initSHRProvider } from './scenarioHandlerRegistry';

const providers = <const>[
  initConfigProvider,
  initAMQPProvider,
  // initSHRProvider,
];

export const initProviders = async () => {
  for (const initProvider of providers) await initProvider();
};
