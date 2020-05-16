import { Universal } from "..";
import { GeneralKey } from "../models/parameters/General";
import { url } from "../constants/ga";

let data: jest.SpyInstance | undefined = undefined;

describe("Univeral", () => {
  describe("Testing with console", () => {
    beforeEach(() => {
      data = jest.spyOn(global.console, "warn");
    });

    afterEach(() => {
      data?.mockRestore();
    });

    test("get exceed limit request", () => {
      const uni = new Universal("UID-1234");

      for (let i = 0; i < 25; i++) {
        uni.track("pageview").par("dh", "string");
      }

      uni.requests();

      expect(console.warn).toBeCalledTimes(1);
    });
  });

  describe("Univeral object", () => {
    test("new object", () => {
      const uni = new Universal("CUSTOM");
      const req = uni.requests();

      expect(uni.size()).toEqual(0);
      expect(req.link).toEqual(`https://${url}`);
      expect(req.method).toEqual(`POST`);
      expect(req.body).toContain(``);
    });

    test("custom http protocal", () => {
      const uni = new Universal("CUSTOM", { protocal: { http: "http" } });
      expect(uni.requests().link).toEqual(`http://${url}`);
    });

    test("custom request method", () => {
      const uni = new Universal("CUSTOM", { protocal: { method: "GET" } });
      expect(uni.requests().method).toEqual(`GET`);
    });

    test("custom request agent", () => {
      const uni = new Universal("CUSTOM", { protocal: { userAgent: "custom" } });
      expect(uni.requests().agent).toEqual(`custom`);
    });

    test("custom request user id", () => {
      const uni = new Universal("CUSTOM", { protocal: { userAgent: "custom" }, user: { uid: "test" } });

      uni.track("pageview").par("dh", "string");
      expect(uni.requests().body).toContain(`uid=test`);
    });

    test("custom request cache to true", () => {
      const uni = new Universal("CUSTOM", { option: { caches: true } });

      uni.track("pageview").par("dh", "string");
      expect(uni.requests().body).not.toContain(`z=`);
    });

    test("custom request cache to false", () => {
      const uni = new Universal("CUSTOM", { option: { caches: false } });

      uni.track("pageview").par("dh", "string");
      expect(uni.requests().body).toContain(`z=`);
    });

    test("must create tracking first", () => {
      const uni = new Universal("UID-1234");
      uni.cus("key", "value");

      expect(uni.requests().body).toEqual(``);
    });

    test.each([
      ["string", "ds" as GeneralKey, "sources"],
      ["string", "npa" as GeneralKey, true],
      ["string", "aip" as GeneralKey, false],
      ["string", "qt" as GeneralKey, 1234],
      ["string", "de" as GeneralKey, "asdf"],
    ])("include default %s parameters", (_type, key, value) => {
      const uni = new Universal("UID-1234");

      uni.par(key, value);
      uni.track("pageview").par("dh", "string");
      const req = uni.requests();

      if (value === true) {
        expect(req.body).toContain(`${key}=1`);
      } else if (value === false) {
        expect(req.body).toContain(`${key}=0`);
      } else {
        expect(req.body).toContain(`${key}=${value}`);
      }
    });

    test("bypass par type by undefined", () => {
      const uni = new Universal("UID-1234");
      uni.par("geoid", (undefined as unknown) as string);
      uni.track("pageview");

      const req = uni.requests();
      expect(req.body).toContain(`geoid=`);
    });

    test("bypass par type by function", () => {
      const uni = new Universal("UID-1234");
      const fn = () => {
        return "hello";
      };

      uni.par("geoid", (fn as unknown) as string);
      uni.track("pageview");

      const req = uni.requests();
      expect(req.body).toContain(`geoid=`);
    });

    test("include custom parameters", () => {
      const uni = new Universal("UID-1234");

      uni.cus("key", "value").par("ds", "testing").par("je", true).par("ds", "sources");
      uni.track("pageview").par("dh", "string");

      expect(uni.requests().body).toContain(`key=value`);

      expect(uni.requests().body).toContain(`je=1`);
      expect(uni.requests().body).toContain(`ds=sources`);
    });

    test("unset custom parameters", () => {
      const uni = new Universal("UID-1234");

      uni.cus("key", "value").par("ds", "testing");
      uni.track("pageview").par("dh", "string");

      expect(uni.requests().body).toContain(`key=value`);

      uni.unset("key");
      expect(uni.requests().body).not.toContain(`key=value`);
    });

    test("reset all tracking", () => {
      const uni = new Universal("UID-1234");

      uni.cus("key", "value").par("ds", "testing");

      uni.track("pageview").par("dh", "string");
      expect(uni.requests().body).toContain(`t=pageview`);

      uni.reset();

      expect(uni.requests().body).toBeDefined();
      expect(uni.requests().body).toEqual("");
    });

    test("reset() didn't remove default parameters", () => {
      const uni = new Universal("UID-1234");

      uni.cus("key", "value").par("ds", "testing");

      uni.track("pageview").par("dh", "string");
      const req = uni.requests();
      expect(req.body).toContain(`t=pageview`);
      expect(req.body).toContain(`dh=string`);
      expect(req.body).toContain(`ds=testing`);

      uni.reset();

      const req1 = uni.requests();
      expect(req1.body).toBeDefined();
      expect(req1.body).toEqual("");

      uni.track("screenview").par("aiid", "string");

      const req2 = uni.requests();
      expect(req2.body).toContain("t=screenview");
      expect(req2.body).toContain(`ds=testing`);
    });

    test("include tracking value", () => {
      const uni = new Universal("UID-1234");

      uni.track("pageview").par("dh", "string");
      expect(uni.requests().body).toContain(`t=pageview`);
    });

    test("include tracking property", () => {
      const uni = new Universal("UID-1234");

      uni.track("pageview").par("dh", "string");
      expect(uni.requests().body).toContain(`dh=string`);
    });

    test("include tracking property", () => {
      const tid = "TID-1234";
      const uni = new Universal(tid);

      uni.track("pageview").par("dh", "string");
      expect(uni.requests().body).toContain(tid);
    });

    test("include tracking property", () => {
      const tid = "TID-1234";
      const uni = new Universal(tid);

      uni.track("pageview").par("dh", "string");

      expect(uni.requests().body).toContain(`tid=${tid}`);
      expect(uni.requests().body).toContain("cid=");
      expect(uni.requests().body).toContain("v=1");
    });

    test("create normal request", () => {
      const uni = new Universal("CIS-1200");

      uni.track("pageview").par("dh", "string");

      expect(uni.requests().path).toContain(`collect`);
    });

    test("create batch request", () => {
      const uni = new Universal("CIS-1200");

      uni.track("pageview").par("dh", "string");
      uni.track("social").par("adsf", "hello");

      expect(uni.requests().path).toContain(`batch`);
    });
  });
});
