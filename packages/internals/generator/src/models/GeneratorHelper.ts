import { resolve } from "path";

export class GeneratorHelper {
  private monorepo: string;
  private name: string;

  constructor(private root: string) {
    this.name = "";
    console.log(`root: ${root}`);
    this.monorepo = resolve(root, "..", "..", "..");
  }

  generatorName(name: string) {
    this.name = name;
    return this;
  }

  /**
   * direct to template files
   * @param filename
   */
  template(filename: string) {
    return resolve(this.root, "includes", this.name, filename);
  }

  /**
   * direct to anywhere in this root monorepo
   * @param paths
   */
  location(...paths: string[]) {
    return resolve(this.monorepo, ...paths);
  }

  /**
   * direct to project in root monorepo
   *
   * @param paths
   */
  module(...paths: string[]) {
    return resolve(this.monorepo, "packages", "{{category}}", "{{name}}", ...paths);
  }
}
