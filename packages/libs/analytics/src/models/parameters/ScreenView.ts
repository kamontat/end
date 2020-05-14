import { from, ElementType } from "./ElementType";

const types = from("an", "av", "aid", "aiid", "cd");

export type ScreenView = ElementType<typeof types>;
export const checkingScreenView = (input: string) => {
  return types.includes(input as ScreenView);
};
