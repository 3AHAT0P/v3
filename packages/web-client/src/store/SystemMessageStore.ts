import { defineStore } from 'pinia';
import { ActionFromClient, ActionToClient } from '@text-game/shared/APIGatewayShared/index';
import { UserAction } from '@text-game/shared/Main/Action';

export interface MainState {
  messages: ActionToClient[],
  isConnected: boolean;
  userActLayout: UserAction[][];
}

export const useSystemMessageStore = defineStore('system-messages', {
  state: (): MainState & { __sendMessageToServer(message: ActionFromClient): void } => ({
    messages: [],
    isConnected: false,
    userActLayout: [],
    __sendMessageToServer() {},
  }),
  getters: {
    lastMessage(state) {
      return state.messages.at(-1);
    },
  },
  actions: {
    onMessageFromServer(message: ActionToClient) {
      this.messages.push(message);
      if (message.needAnswer) this.userActLayout = message.userActLayout;
      else this.userActLayout = [];
    },
    onConnected() {
      this.isConnected = true;
    },
    onDisconnected() {
      this.isConnected = false;
    },
    sendMessageToServer(actionId: ActionFromClient['action']) {
      this.userActLayout = [];
      this.__sendMessageToServer({ action: actionId });
    },
  },
});
