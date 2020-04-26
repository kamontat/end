import Throwable from "./throwable";
import { EventEmitter } from "events";

export type RunFn<R> = () => R;

export default class Manager extends EventEmitter {
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

  private add<E extends Error>(err: E) {
    const throwable = Throwable.from(err);
    this.errors.push(throwable);
  }
}
