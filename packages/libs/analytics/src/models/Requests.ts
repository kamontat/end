export class Requests {
  constructor(
    public readonly link: string,
    public readonly path: string,
    public readonly method: string,
    public readonly body: string
  ) {}

  get contentType() {
    return `text/plain; charset=utf-8`;
  }

  get agent() {
    return `nmsys`;
  }

  getHttpRequestAsString() {
    return `${this.method} ${this.path} HTTP/1.1
    Content-Type: ${this.contentType}
    Host: ${this.link}
    Connection: close
    User-Agent: ${this.agent}
    Content-Length: ${this.body.length}
    
    ${this.body}
    `;
  }
}
