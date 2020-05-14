import { from, ElementType } from "./ElementType";

const types = from("dh", "dp", "dt");

export type PageView = ElementType<typeof types>;
export const checkingPageView = (input: string) => {
  return types.includes(input as PageView);
};
