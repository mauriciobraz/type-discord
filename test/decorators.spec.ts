import { On, Once } from '../source/decorators';
import { MetadataStorage } from '../source/metadata/storage';
import { EventCallback } from '../source/metadata/types';
import { EventArgs } from '../source/types';

type TypedEventDescriptor = TypedPropertyDescriptor<EventCallback<'ready'>>;

describe('decorators', () => {
  beforeAll(async () => {
    await MetadataStorage.build();
  });

  beforeEach(() => {
    MetadataStorage.clear();
  });

  it('should add an "@On" and an "@Once" event listener to the client', () => {
    class TestModule {
      handleReady(_args: EventArgs<'ready'>) {}
    }

    On('ready')(
      TestModule.prototype,
      'handleReady',
      Object.getOwnPropertyDescriptor(
        TestModule.prototype,
        'handleReady'
      ) as TypedEventDescriptor
    );

    Once('ready')(
      TestModule.prototype,
      'handleReady',
      Object.getOwnPropertyDescriptor(
        TestModule.prototype,
        'handleReady'
      ) as TypedEventDescriptor
    );

    new TestModule();

    expect(MetadataStorage.instance.events).toHaveLength(2);
  });
});
