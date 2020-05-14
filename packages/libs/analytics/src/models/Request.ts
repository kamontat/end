export class Request {
  constructor(
    private readonly _id: string,
    private readonly _version: string,
    private readonly _tid: string,
    private readonly _cid: string,
    private readonly _parameters: Record<string, string>
  ) {}

  get id() {
    return this._id;
  }

  private get version() {
    return `v=${this._version}`;
  }

  private get tracingID() {
    return `tid=${this._tid}`;
  }

  private get clientID() {
    return `cid=${this._cid}`;
  }

  private get others() {
    return Object.keys(this._parameters)
      .map(k => `${k}=${this._parameters[k]}`)
      .join("&");
  }

  get body() {
    return `${this.version}&${this.tracingID}&${this.clientID}&${this.others}`;
  }
}
