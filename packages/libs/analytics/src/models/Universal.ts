import { v4 } from "uuid";

import { StrictUniversalOptions, UniversalOptions } from "./interfaces/UniversalOptions";
import { url, method, batchPath, collectPath, batchLimit } from "./../constants/ga";
import { Parameter } from "./Parameter";
import { Tracking } from "./Tracking";
import { Monitor } from "./Monitor";
import { HitType } from "./parameters/HitType";
import { Request } from "./Request";
import { GeneralMapper, GeneralKey } from "./parameters/General";
import { Requests } from "./Requests";

export class Universal {
  private _options: StrictUniversalOptions;
  private _parameters: Parameter;
  private _monitor: Monitor;

  constructor(tid: string, opts?: UniversalOptions) {
    this._options = {
      tid: tid,
      protocal: { version: "1", http: "https", baseurl: url, method: method, ...opts?.protocal },
      user: { cid: v4(), ...opts?.user },
      custom: {},
    };

    this._monitor = new Monitor();
    this._parameters = {};
  }

  par<K extends GeneralKey = keyof GeneralMapper, V extends GeneralMapper[K] = GeneralMapper[K]>(key: K, value: V) {
    if (typeof value === "boolean") return this.cus(key, value ? "1" : "0");
    if (typeof value === "number") return this.cus(key, value.toString());
    if (typeof value === "string") return this.cus(key, value);

    return this.cus(key, value.toString());
  }

  cus(key: string, value: string) {
    this._parameters[key] = value;
    return this;
  }

  unset(key: string) {
    delete this._parameters[key];
  }

  track<T extends HitType>(type: T) {
    return new Tracking(this._monitor, type);
  }

  reset() {
    this._monitor.reset();
  }

  requests() {
    return new Requests(
      this.iGetLink(),
      this.iGetPath(),
      this.iGetMethod(),
      this.iGetRequests()
        .map(v => v.body)
        .join("\n")
    );
  }

  size() {
    return this._monitor.size;
  }

  private iGetMethod() {
    return this._options.protocal.method;
  }

  private iGetLink() {
    return `${this._options.protocal.http}://${this._options.protocal.baseurl}`;
  }

  private iGetPath() {
    return this._monitor.size > 1 ? batchPath : collectPath;
  }

  private iGetRequests() {
    if (this._monitor.size > batchLimit) console.warn("limit only 20 request per batch");

    return this._monitor.parameters(batchLimit).map(v => {
      const parameters = {
        ...this._options.custom,
        ...this._parameters,
        ...v.value,
      };

      // include uid
      if (this._options.user.uid) parameters.uid = this._options.user.uid;

      return new Request(v.id, this._options.protocal.version, this._options.tid, this._options.user.cid, parameters);
    });
  }
}
