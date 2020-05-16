import { from, ElementType } from "./ElementType";
import { PageView } from "./PageView";
import { ScreenView } from "./ScreenView";
import { Event } from "./Event";
import { Transaction } from "./Transaction";
import { Social } from "./Social";
import { Item } from "./Item";
import { Exception } from "./Exception";
import { Timing } from "./Timing";

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
  event: Event;
  transaction: Transaction;
  item: Item;
  social: Social;
  exception: Exception;
  timing: Timing;
};
