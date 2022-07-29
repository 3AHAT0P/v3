export interface MessageQueue<T> {
  addMessage(message: T): void;
  getNextMessage(): Promise<T>;
  destroy(): void;
}

export const createMessageQueue = <T>(): MessageQueue<T> => {
  const messages: T[] = [];

  let resolvePromise: ((value: T) => void) | null = null;
  let rejectPromise: ((reason?: any) => void) | null = null;

  return {
    addMessage(message: T): void {
      if (resolvePromise === null) messages.push(message);
      else resolvePromise(message);
    },
    destroy() {
      if (rejectPromise !== null) rejectPromise();
    },
    async getNextMessage(): Promise<T> {
      const message = messages.shift();

      if (message != null) return message;

      return new Promise((resolve, reject) => {
        resolvePromise = resolve;
        rejectPromise = reject;
      });
    },
  };
};
