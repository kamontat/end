import { from, ElementType } from "./ElementType";

// &ti=T12345                            // Transaction ID. Required.
// &ta=Google%20Store%20-%20Online       // Affiliation.
// &tr=37.39                             // Revenue.
// &tt=2.85                              // Tax.
// &ts=5.34                              // Shipping.
// &tcc=SUMMER2013                       // Transaction coupon.
const types = from("ti", "ta", "tr", "tt", "ts", "tcc");

export type Transaction = ElementType<typeof types>;
export const checkingTransaction = (input: string) => {
  return types.includes(input as Transaction);
};
