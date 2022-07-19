import { MessageContainer } from '@text-game/shared/APIGatewayShared';
import { AMQPAdapter } from '@text-game/shared/AMQP';
import { loginfo, logerror } from '@text-game/shared/Logger';

interface Config {
  messageBrokerPath: string;
}

const CONFIG: Config = {
  messageBrokerPath: 'amqp://messagebroker',
};

const onActionFromClientRecieve = (messageContainer: MessageContainer): void => {
  loginfo('onActionFromClientRecieve', " [x] Received '%s'", messageContainer);
};

const main = async (config: Config) => {
  try {
    const adapter = new AMQPAdapter({ connectionURL: config.messageBrokerPath });

    await adapter.init();

    const queueName = 'ACTION_FROM_CLIENT';

    await adapter.consume(queueName, onActionFromClientRecieve, { noAck: true });

    loginfo('main', ' [*] Waiting for messages. To exit press CTRL+C');
  } catch (error) {
    logerror('main::catch', error);
    throw new Error('!');
  }
};

main(CONFIG).finally(() => loginfo('main::finally', 'FINAL!'));
