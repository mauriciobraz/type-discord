import { ClientEvents } from 'discord.js';

import { Client } from '../../client';

export type EventCallback<T extends keyof ClientEvents> = (
  args: ClientEvents[T],
  client?: Client
) => any;

export type EventMetadata<T extends keyof ClientEvents = any> = {
  name: T;
  target: EventCallback<T>;
  type: 'on' | 'once';
};
