import { ScenarioHandler } from '../ScenarioHandler';
import { RouteResolver } from '../RouteResolver';

import { greeting } from './greeting';
import { returnToGreeting } from './returnToGreeting';
import { showDonateLink } from './showDonateLink';
import { showMainContact } from './showMainContact';
import { showDemoList } from './showDemoList';

const registry: Readonly<Record<string, ScenarioHandler>> = {
  GREETING: greeting,
  RETURN_TO_GREETING: returnToGreeting,
  SHOW_DONATE_LINK: showDonateLink,
  SHOW_MAIN_CONTACT: showMainContact,
  SHOW_DEMO_LIST: showDemoList,
};

export const resolver: RouteResolver = (name: string): ScenarioHandler => {
  if (name in registry) return registry[name];

  throw new Error(`Handler name is incorrect (${name})`);
};
