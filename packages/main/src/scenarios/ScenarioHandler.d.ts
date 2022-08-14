import { ActionToClient } from '@text-game/shared/APIGatewayShared';
import { ClientRecord } from '@/ClientRecord';

export type ScenarioHandler = (userInfo: ClientRecord) => Promise<ActionToClient>;
