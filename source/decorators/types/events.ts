import { ClientEvents } from 'discord.js';

import { Client } from '../../client';
import { EventCallback } from '../../metadata/types';

/**
 * Typed decorator for the `@On` and `@Once` decorators.
 */
export type TypedEventDecorator<T extends keyof ClientEvents> = (
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<EventCallback<T>>
) => void;
