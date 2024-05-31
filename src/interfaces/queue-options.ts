import { AdvancedRepeatOptions } from './advanced-options';
import { DefaultJobOptions } from './base-job-options';
import { ConnectionOptions } from './redis-options';

export enum ClientType {
  blocking = 'blocking',
  normal = 'normal',
}

/**
 * Base Queue options
 */
export interface QueueBaseOptions {
  /**
   * Options for connecting to a Redis instance.
   */
  connection: ConnectionOptions;

  /**
   * Denotes commands should retry indefinitely.
   */
  blockingConnection?: boolean;

  /**
   * Prefix for all queue keys.
   */
  prefix?: string;

  /**
   * Avoid version validation to be greater or equal than v5.0.0.
   * @defaultValue false
   */
  skipVersionCheck?: boolean;

  /**
   * Pass a custom serializer to serialize job data into Redis
   * @param data - the data for the job
   * @returns the serialized string
   */
  serializer?: (data: any) => string;

  /**
   * Pass a custom deserializer to deserialize job data
   * @param data - the serialized job data
   * @returns the deserialize job data
   */
  deserializer?: (data: string) => any;
}

/**
 * Options for the Queue class.
 */
export interface QueueOptions extends QueueBaseOptions {
  defaultJobOptions?: DefaultJobOptions;

  /**
   * Options for the streams used internally in BullMQ.
   */
  streams?: {
    /**
     * Options for the events stream.
     */
    events: {
      /**
       * Max approximated length for streams. Default is 10 000 events.
       */
      maxLen: number;
    };
  };

  settings?: AdvancedRepeatOptions;
}

/**
 * Options for the Repeat class.
 */
export interface RepeatBaseOptions extends QueueBaseOptions {
  settings?: AdvancedRepeatOptions;
}

/**
 * Options for QueueEvents
 */
export interface QueueEventsOptions extends QueueBaseOptions {
  /**
   * Condition to start listening to events at instance creation.
   */
  autorun?: boolean;
  /**
   * Last event Id. If provided it is possible to continue
   * consuming events from a known Id instead of from the last
   * produced event.
   */
  lastEventId?: string;

  /**
   * Timeout for the blocking XREAD call to the events stream.
   */
  blockingTimeout?: number;
}
