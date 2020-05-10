import Throwable from "./throwable";
import { EventEmitter } from "events";

export type RunFn<R> = () => R;

export enum EventType {
  NEW_ERROR = "new-error",
}

export abstract class AbstractManager extends EventEmitter {
  emit(event: EventType, ...args: [Throwable]): boolean {
    console.log(`trigger new event: ${event}`);
    return super.emit(event, ...args);
  }
  on(event: EventType.NEW_ERROR, listener: (...args: [Throwable]) => void): this {
    return super.on(event, listener);
  }
}

export default class Manager extends AbstractManager {
  private errors: Throwable[];

  constructor() {
    super();
    this.errors = [];
  }

  run<R>(fn: RunFn<R>) {
    try {
      return fn();
    } catch (e) {
      this.add(e);
    }
  }

  runFuture<R>(fn: RunFn<Promise<R>>): Promise<R | undefined> {
    return fn().catch((e) => {
      this.add(e);
      return undefined;
    });
  }

  get hasDeadly() {
    return this.errors.some((v) => v.needsExit);
  }

  get formatted() {
    let msg = "Errors: \n";
    msg += this.errors.map((e) => `  - ${e.toString()}`);
    return msg;
  }

  get size() {
    return this.errors.length;
  }

  private add<E extends Error>(err: E) {
    const throwable = Throwable.from(err);
    this.emit(EventType.NEW_ERROR, throwable);
    this.errors.push(throwable);
  }
}
