import { defineStore } from 'pinia';
import { ActionToClient } from '@text-game/shared/APIGatewayShared/index';
import { UserAction } from '@text-game/shared/Main/Action';

export interface MainState {
  messages: ActionToClient[],
  isConnected: boolean;
  userActLayout: UserAction[][];
}

export const useSystemMessageStore = defineStore('system-messages', {
  state: (): MainState => ({
    messages: [],
    isConnected: false,
    userActLayout: [],
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
    sendMessageToServer() {
      this.userActLayout = [];
    }
  },
});
