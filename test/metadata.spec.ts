import { MetadataStorage } from '../source/metadata/storage';
import { EventCallback } from '../source/metadata/types';

describe('decorators', () => {
  beforeAll(async () => {
    await MetadataStorage.build();
  });

  beforeEach(() => {
    MetadataStorage.clear();
  });

  it('should add 100 events', () => {
    const events = Array.from({ length: 100 }, (_value, _key) => ({
      name: 'ready',
      target: jest.fn() as EventCallback<'ready'>,
    }));

    events.forEach(event => {
      MetadataStorage.instance.collectEvent({
        name: event.name,
        target: event.target,
        type: 'on',
      });
    });

    expect(MetadataStorage.instance.events).toHaveLength(100);
  });
});
