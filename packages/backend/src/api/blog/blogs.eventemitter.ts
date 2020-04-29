import { EventEmitter } from 'events';

type BlogsEvent = 'create' | 'publish' | 'update' | 'delete';

export interface BlogsEventEmitter {
  on(event: BlogsEvent, listener: (...args: unknown[]) => void): this;
  emit(event: BlogsEvent, ...args: unknown[]): boolean;
}

export class BlogsEventEmitter extends EventEmitter {}
