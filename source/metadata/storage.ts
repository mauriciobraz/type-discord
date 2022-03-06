import { EventMetadata } from './types';

export class MetadataStorage {
  static #instance: MetadataStorage;
  static #built: boolean = false;

  #events: EventMetadata[] = [];

  // Getters

  static get instance() {
    return (this.#instance ??= new MetadataStorage());
  }

  static get built() {
    return this.#built;
  }

  get events() {
    return this.#events;
  }

  // Collectors

  collectEvent(event: EventMetadata): void {
    this.#events.push(event);
  }

  static clear(): void {
    this.#built = false;
    this.#instance = new MetadataStorage();

    this.instance.#events = [];
  }

  static async build(): Promise<void> {
    if (this.#built) {
      return;
    }

    this.#built = true;
  }
}
