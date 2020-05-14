import { Universal } from "./models/Universal";

// par => par(key: K, value: string)        - with autocomplete base on your visitor doing
// obj => obj(obj: {key: value})            - with multiple parameters as once
// cus => cus(key: string, value: string)   - with single parameter but customize
const universal = new Universal("UA-CUSTOM-ID");

// settings persistent parameters
universal.par("aip", false);
universal.par("ds", "");
universal.par("aip", true);

universal.track("pageview").par("dh", "param").cus("custom", "param").obj({ object: "param" });
universal.track("social").par("default", "param").cus("custom", "param").obj({ object: "param" });
universal.track("item").par("default", "param").cus("custom", "param").obj({ object: "param" });

// this will return request
const req1 = universal.requests();
console.log(req1.getHttpRequestAsString());

// this will send
// universal.send();

// this will remove all saved request
universal.reset();

// second round
universal.track("pageview").par("dh", "param").cus("custom", "param").obj({ object: "param" });

const req2 = universal.requests();
console.log(req2.getHttpRequestAsString());
