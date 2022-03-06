import DiscordJS from 'discord.js';

import { MetadataStorage } from './metadata/storage';
import { ILogger, ClientOptions } from './types';

export class Client extends DiscordJS.Client {
  #logger?: ILogger;

  constructor(options: ClientOptions) {
    super(options);

    if (options.useLogger) {
      this.#logger = options.logger ?? console;
    }
  }

  /**
   * Redirects the interaction to their respective handler.
   *
   * @usage
   * ```ts
   * ...
   * // The client must be the client from the library.
   * client.on('interactionCreate', client.handleInteraction);
   * ...
   * ```
   */
  handleInteraction(_interaction: DiscordJS.Interaction): void {
    this.#logger?.warn(
      `[Client.handleInteraction] Method not implemented yet, per now only support events.`
    );
  }

  async login(token: string): Promise<string> {
    await MetadataStorage.build();
    await this.#registerEventsFromMetadata();

    const loginPromise = super.login(token);

    if (this.#logger) {
      loginPromise
        .then(response => {
          this.#logger?.info(`[Client.login] Logged in as ${this.user?.tag}.`);
          return response;
        })
        .catch(reason => {
          this.#logger?.error(`[Client.login] An error occurred: ${reason}.`);
          return reason;
        });
    }

    return loginPromise;
  }

  async #registerEventsFromMetadata(): Promise<void> {
    if (!MetadataStorage.built) {
      await MetadataStorage.build();
    }

    MetadataStorage.instance.events.forEach(event => {
      switch (event.type) {
        case 'on':
          this.on(event.name, args => event.target(args, this));
          this.#logger?.info(
            `[Client.login] Registered '${event.name}' event listener.`
          );

          break;

        case 'once':
          this.once(event.name, args => event.target(args, this));
          this.#logger?.info(
            `[Client.login] Registered the event '${event.name}' once.`
          );

          break;

        default:
          this.#logger?.error(
            `[Client.login] Received an unsupported event type: ${event.type}.`
          );
      }
    });
  }
}
