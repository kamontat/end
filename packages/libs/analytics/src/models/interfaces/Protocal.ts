type Version = "1";
type HttpType = "http" | "https";
type HttpMethod = "POST" | "GET";

export interface Protocal {
  version?: Version;
  http?: HttpType;
  baseurl?: string;
  method?: HttpMethod;
  userAgent?: string;
}

export interface StrictProtocal {
  version: Version;
  http: HttpType;
  baseurl: string;
  method: HttpMethod;

  userAgent?: string;
}
