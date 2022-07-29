import { logerror } from '@text-game/shared/Logger';
import { ActionToClient } from '@text-game/shared/APIGatewayShared';

import { ClientRecord } from '@/ClientRecord';

const LOGGER_PLACE = 'HandshakeScenario:run';

export const run = async (client: ClientRecord): Promise<void> => {
  const firstMessage: ActionToClient = {
    text: 'Hi',
    needAnswer: true,
    userActLayout: [[{ id: '1', text: 'Hello?', type: 'OTHER' }, { id: '2', text: 'Who is here?', type: 'OTHER' }]],
  };
  await client.sendMessage(firstMessage);

  const answer = await client.recievedMessageQueue.getNextMessage();
  const action = firstMessage.userActLayout.flat().find(({ id }) => id === answer.action);

  switch (action?.id) {
    case '1': {
      await client.sendMessage({
        text: action.text,
        needAnswer: false,
        userActLayout: [],
      });
      await client.sendMessage({
        text: '!',
        needAnswer: false,
        userActLayout: [],
      });
      break;
    }
    case '2': {
      await client.sendMessage({
        text: action.text,
        needAnswer: false,
        userActLayout: [],
      });
      await client.sendMessage({
        text: 'It\'s YOU!',
        needAnswer: false,
        userActLayout: [],
      });
      break;
    }
    default: {
      logerror(LOGGER_PLACE, `Answer id is incorrect (#${answer.action})`, answer);
    }
  }
};
