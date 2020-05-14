import { from, ElementType } from "./ElementType";
import { PageView } from "./PageView";
import { ScreenView } from "./ScreenView";

const types = from("pageview", "screenview", "event", "transaction", "item", "social", "exception", "timing");

export type HitType = ElementType<typeof types>;

export const checkingHitType = (input: string) => {
  return types.includes(input as HitType);
};

export const convertHitTypeToString = (type: HitType) => {
  return type as string;
};

export const convertStringToHitType = (type: string): HitType | undefined => {
  if (checkingHitType(type)) return type as HitType;
  else return undefined;
};

export const getHitTypeKeyPair = (type: HitType) => {
  return { t: type };
};

export type HitTypeMapper = {
  pageview: PageView;
  screenview: ScreenView;
  event: string;
  transaction: string;
  item: string;
  social: string;
  exception: string;
  timing: string;
};
