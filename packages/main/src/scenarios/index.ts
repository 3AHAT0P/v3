import { ScenarioHandler } from './ScenarioHandler';
import * as handshakeScenarioHandlers from './handshake';
import * as demoStoryHandlers from './demo/story';

// const registry: Record<string, ScenarioHandler>;
const registry = <const>{
  'HANDSHAKE.GREETING': handshakeScenarioHandlers.greeting,
  'HANDSHAKE.RETURN_TO_GREETING': handshakeScenarioHandlers.returnToGreeting,
  'HANDSHAKE.SHOW_DONATE_LINK': handshakeScenarioHandlers.showDonateLink,
  'HANDSHAKE.SHOW_MAIN_CONTACT': handshakeScenarioHandlers.showMainContact,
  'HANDSHAKE.DEMO.SHOW_LIST': handshakeScenarioHandlers.showDemoList,

  'DEMO.STORY.START': demoStoryHandlers.start,
  'DEMO.STORY.TAKE_SWORD': demoStoryHandlers.takeSword,
  'DEMO.STORY.CHOP': demoStoryHandlers.chop,
  'DEMO.STORY.LOOK_AROUND': demoStoryHandlers.lookAround,
};

export type ScenarioHandlerName = keyof typeof registry;

export const getScenarioHandler = (name: ScenarioHandlerName): ScenarioHandler => {
  if (name in registry) return registry[name];

  throw new Error('handler name is incorrect');
};
