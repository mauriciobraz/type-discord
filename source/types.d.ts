import { ClientEvents, ClientOptions } from 'discord.js';

export type ClientOptions = ClientOptions & {
  /**
   * Enable client logging.
   */
  useLogger?: boolean;

  /**
   * The logger to use for logging. By default we use the console.
   */
  logger?: ILogger;
};

/**
 * Logger interface.
 */
export interface ILogger {
  log(...messages: string[]): void;
  info(...messages: string[]): void;
  warn(...messages: string[]): void;
  error(...messages: string[]): void;
}

/**
 * Extracts the typings for the client events.
 *
 * @example
 * ```ts
 * handleMessageCreate(
 *   [message]: EventArgs<'messageCreate'>
 * ): void;
 * ```
 */
export type EventArgs<T extends keyof ClientEvents> = ClientEvents[T];
