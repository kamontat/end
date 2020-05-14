import { Parameter } from "./Parameter";

export type ParameterObject = { id: string; value: Parameter };
export type Parameters = Array<ParameterObject>;

export class Monitor {
  private requests: Map<string, Parameter>;

  constructor() {
    this.requests = new Map();
  }

  receiving(id: string, obj: Parameter) {
    const old = this.requests.get(id) ?? {};
    this.requests.set(id, { ...old, ...obj });
  }

  get size() {
    return this.requests.size;
  }

  parameters(limit: number = -1): Parameters {
    return Array.from(this.requests.entries())
      .map(v => {
        return { id: v[0], value: v[1] };
      })
      .filter((_, i) => (limit < 0 ? true : i <= limit));
  }

  reset() {
    this.requests.clear();
  }
}
