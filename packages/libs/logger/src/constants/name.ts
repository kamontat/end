export class LoggerName {
  static root: string = "nmsys";
  static separator: string = ":";

  static is(root: string = LoggerName.root, seperator: string = LoggerName.separator) {
    return new LoggerName(root, seperator);
  }

  private readonly name: string[];
  constructor(
    private readonly root: string = LoggerName.root,
    private readonly seperator: string = LoggerName.separator
  ) {
    this.name = [this.root];
  }

  get rootName(): string {
    return this.root;
  }

  e(name: string) {
    return this.extends(name);
  }

  extends(name: string) {
    this.name.push(name);
    return this;
  }

  toString() {
    return this.name.join(this.seperator);
  }
}
