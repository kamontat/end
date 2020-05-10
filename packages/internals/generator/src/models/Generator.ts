import { NodePlopAPI, PlopGenerator } from "plop";
import { GeneratorHelper } from "./GeneratorHelper";

export abstract class Generator {
  constructor(private _name: string) {}

  get name() {
    return this._name;
  }

  abstract config(plop: NodePlopAPI): void;

  abstract generate(helper: GeneratorHelper): PlopGenerator;
}

export { NodePlopAPI as Plop, PlopGenerator as GeneratorObject, GeneratorHelper as Helper };
