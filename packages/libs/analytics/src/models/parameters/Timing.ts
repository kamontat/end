import { from, ElementType } from "./ElementType";

const types = from("utc", "utv", "utt", "utl", "plt", "dns", "pdt", "rrt", "tcp", "srt", "dit", "clt");

export type Timing = ElementType<typeof types>;
export const checkingTiming = (input: string) => {
  return types.includes(input as Timing);
};
