import { DependencyType, DependencyFrom } from "../constants/dependency";

export type StyleObject = Record<string, string>;

export type StyleLayout<T extends string> = {
  [name in T]?: {
    arguments: StyleObject;
  };
};

export type FirstLevelStyles = {
  [name in DependencyType]?: {
    arguments: StyleObject;
  } & StyleLayout<DependencyFrom>;
};

export type Styles = {
  arguments: StyleObject;
} & FirstLevelStyles;

export class Stylist {
  private styles: Styles;

  private type: DependencyType | undefined;
  private from: DependencyFrom | undefined;

  constructor(def: StyleObject) {
    this.styles = {
      arguments: def,
    };
  }

  when(type: DependencyType, from?: DependencyFrom) {
    this.type = type;
    this.from = from;

    return this;
  }

  whenFrom(from: DependencyFrom) {
    this.from = from;

    return this;
  }

  then(name: string, value: string) {
    // set default value
    if (!this.type) {
      this.styles.arguments[name] = value;
      return this;
    }

    if (this.type) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const type = this.styles[this.type] ?? { arguments: {} };

      if (this.type && !this.from) type.arguments[name] = value;
      this.styles[this.type] = type;

      if (this.from) {
        const from = type[this.from] ?? { arguments: {} };
        from.arguments[name] = value;
        (this.styles[this.type] ?? {})[this.from] = from;
      }
    }
    return this;
  }

  andThen(name: string, value: string) {
    return this.then(name, value);
  }

  get(): StyleObject {
    // console.debug(JSON.stringify(this.styles, undefined, " "));

    let result = this.styles.arguments;
    if (this.type) {
      const type = this.styles[this.type] ?? { arguments: {} };
      const c = type.arguments;
      result = { ...result, ...c };

      if (this.from) {
        const f = type[this.from]?.arguments ?? {};
        result = { ...result, ...f };
      }
    }

    return result;
  }
}
