import { Generator, Plop } from "./Generator";
import { GeneratorHelper } from "./GeneratorHelper";

export class PlopWrapper {
  private helper: GeneratorHelper;
  constructor(private plop: Plop) {
    this.helper = new GeneratorHelper(process.cwd());
  }

  generate(generator: Generator) {
    generator.config(this.plop);

    const result = generator.generate(this.helper.generatorName(generator.name));
    this.plop.setGenerator(generator.name, result);
  }
}
