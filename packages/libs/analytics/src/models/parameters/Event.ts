import { from, ElementType } from "./ElementType";

const types = from("ec", "ea", "el", "ev");

export type Event = ElementType<typeof types>;
export const checkingEvent = (input: string) => {
  return types.includes(input as Event);
};
