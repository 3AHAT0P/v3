import { UserAction } from '@text-game/shared/Main/Action';

import { MessageAnswer } from './MessageAnswer';

export const buildActLayout = (userActLayout: MessageAnswer[][]): Array<Array<UserAction>> => userActLayout.map(
  (line) => line.map(([id, type, text]) => ({ id, text, type }))
);
