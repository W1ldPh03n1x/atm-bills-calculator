import { BillDenominationList } from "../lib";

export type BillDenomination = (typeof BillDenominationList)[number];

export interface Cassette {
  id: string;
  denomination: BillDenomination;
  billsCount: number;
  isDefective: boolean;
}
