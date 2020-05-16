// type GeneralFunction<T> = () => T;

type GeneralString = string;
type GeneralNumber = number;
type GeneralBoolean = boolean;

type SessionName = "string" | "end";
type Unicode = "UTF-8";
type UserLanguage = "en-us" | "th-th";

// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#<name>
export type GeneralMapper = {
  aip: GeneralBoolean;
  npa: GeneralBoolean;
  ds: GeneralString;
  qt: GeneralNumber;
  sc: SessionName;
  uip: GeneralString;
  geoid: GeneralString;
  dr: GeneralString;
  cs: GeneralString; // Campaign Source
  cm: GeneralString; // Campaign Medium
  ck: GeneralString;
  cc: GeneralString;
  ci: GeneralString; // Campaign ID
  gclid: GeneralString; // Google Ads ID
  dclid: GeneralString; // Google Display Ads ID
  sr: GeneralString; // Screen Resolution
  vp: GeneralString; // Viewport size
  de: Unicode;
  ul: UserLanguage;
  je: GeneralBoolean;
};

export type GeneralKey = keyof GeneralMapper;
