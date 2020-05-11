export enum Unit {
  Byte = 1,
  Kilobyte = 1024,
  Megabyte = 1048576,
}

export class DigitalConverter {
  private readonly _bytes: number;

  constructor(private readonly _size: number, private readonly _unit: Unit) {
    this._bytes = _size * _unit;
  }

  get unit() {
    return this._unit;
  }

  get size() {
    return this._size;
  }

  get bytes() {
    return this._bytes;
  }

  to(unit: Unit) {
    return this._bytes / unit;
  }
}

export default (size: number, unit: Unit) => {
  return new DigitalConverter(size, unit);
};
