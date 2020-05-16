import { Requests } from "../../models/Requests";

describe("Requests", () => {
  test("create new Requests object", () => {
    const req = new Requests("https://google.com", "/next/path", "GET", "", "body");
    expect(req).toBeDefined();
  });

  test("get request link", () => {
    const req = new Requests("https://google.com", "/next/path", "GET", "", "body");
    expect(req.link).toEqual("https://google.com");
  });

  test("get request body", () => {
    const req = new Requests("https://google.com", "/next/path", "GET", "", "body");
    expect(req.body).toEqual("body");
  });

  test("get request method", () => {
    const req = new Requests("https://google.com", "/next/path", "PUT", "", "body");
    expect(req.method).toEqual("PUT");
  });

  test("get request path", () => {
    const req = new Requests("https://google.com", "/current/path", "POST", "", "body");
    expect(req.path).toEqual("/current/path");
  });

  test("get request agent", () => {
    const req = new Requests("https://google.com", "/current/path", "POST", "nmsys", "body");
    expect(req.agent).toEqual("nmsys");
  });

  test("get request content type", () => {
    const req = new Requests("https://google.com", "/current/path", "POST", "", "body");
    expect(req.contentType).toContain("text/plain");
  });

  test("get http request", () => {
    const req = new Requests("https://google.com", "/current/path", "POST", "", "body");

    expect(req.getHttpRequestAsString()).toContain("Connection: close");
    expect(req.getHttpRequestAsString()).toContain("Content-Length: 4");
  });
});
