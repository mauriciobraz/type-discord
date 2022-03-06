import { ClientEvents } from 'discord.js';

import { MetadataStorage } from '../metadata/storage';
import { TypedEventDecorator } from './types';

/**
 * Adds an 'on' event listener to the client.
 *
 * @example
 * ```ts
 * import { Client, EventArgs, On } from 'type-discord';
 *
 * class SomeClass {
 *  \@On('messageCreate')
 *   handleMessageCreate(
 *     [message]: EventArgs<'messageCreate'>
 *   ): void {
 *     return;
 *   }
 *
 *   // You also can access the custom client instance by passing
 *   // the `client` parameter as second argument.
 *  \@On('interactionCreate')
 *   handleInteractionCreate(
 *     [interaction]: EventArgs<'interactionCreate'>,
 *     client: Client
 *   ): void {
 *     return;
 *   }
 * }
 * ```
 */
export function On<T extends keyof ClientEvents>(
  event: T
): TypedEventDecorator<T> {
  return (_target, propertyKey, descriptor) => {
    if (!descriptor.value) {
      throw new Error(
        `[@On] The method "${propertyKey.toString()}" is not a function.`
      );
    }

    MetadataStorage.instance.collectEvent({
      name: event,
      target: descriptor.value,
      type: 'on',
    });
  };
}
