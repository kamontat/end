import { v4 } from "uuid";

import { Monitor } from "./Monitor";
import { HitType, HitTypeMapper, getHitTypeKeyPair } from "./parameters/HitType";
import { Parameter } from "./Parameter";

export class Tracking<K extends HitType = keyof HitTypeMapper, V extends HitTypeMapper[K] = HitTypeMapper[K]> {
  private readonly _id: string;
  constructor(private readonly monitor: Monitor, type: K) {
    this._id = v4();
    this.monitor.receiving(this.id, getHitTypeKeyPair(type));
  }

  par(key: V, value: string) {
    return this.cus((key as unknown) as string, value);
  }

  cus(key: string, value: string) {
    const obj: Parameter = {};
    obj[key] = value;

    return this.obj(obj);
  }

  obj(objs: Parameter) {
    this.monitor.receiving(this.id, objs);
    return this;
  }

  get id() {
    return this._id;
  }
}
