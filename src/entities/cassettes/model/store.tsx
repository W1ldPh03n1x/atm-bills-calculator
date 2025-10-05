import { create } from "zustand";

import { BillDenominationList } from "@/entities/cassettes/lib";
import { UUID } from "@/shared/lib";

import type { BillDenomination, Cassette } from "@/entities/cassettes/model/types";
interface CassettesState {
  cassettes: Record<BillDenomination, Array<Cassette>>;
}

interface CassetteActions {
  addCassette: (denomination: BillDenomination, cassette: Cassette) => void;
  setBillsCount: (denomination: BillDenomination, id: string, count: number) => void;
  toggleDefective: (denomination: BillDenomination, id: string) => void;
  deleteCassette: (denomination: BillDenomination, id: string) => void;
  getTotalBillsByDenomination: (denomination: BillDenomination) => number;
  getTotalBills: () => number;
}

interface CassetteStore extends CassettesState, CassetteActions {}

const initialState: CassettesState = {
  cassettes: BillDenominationList.reduce(
    (acc, denomination) => ({
      ...acc,
      [denomination]: [{ id: UUID(), denomination, isDefective: false, billsCount: 100 }],
    }),
    {} as Record<BillDenomination, Array<Cassette>>
  ),
};

const useCassettes = create<CassetteStore>()((set, get) => ({
  ...initialState,
  // Actions
  addCassette(denomination, cassette) {
    const cassetteToPush = { ...cassette, id: UUID() };
    set(({ cassettes }) => ({
      cassettes: { ...cassettes, [denomination]: [...cassettes[denomination], cassetteToPush] },
    }));
  },
  setBillsCount(denomination, id, count) {
    set(({ cassettes }) => ({
      cassettes: {
        ...cassettes,
        [denomination]: cassettes[denomination].map((cassette) =>
          cassette.id == id ? { ...cassette, billsCount: Math.max(count, 0) } : cassette
        ),
      },
    }));
  },
  toggleDefective(denomination: BillDenomination, id: string) {
    set(({ cassettes }) => ({
      cassettes: {
        ...cassettes,
        [denomination]: cassettes[denomination].map((cassette) =>
          cassette.id === id ? { ...cassette, isDefective: !cassette.isDefective } : cassette
        ),
      },
    }));
  },
  deleteCassette(denomination, id) {
    set(({ cassettes }) => ({
      cassettes: {
        ...cassettes,
        [denomination]:
          cassettes[denomination].length === 1
            ? cassettes[denomination]
            : cassettes[denomination].filter((cassette) => id !== cassette.id),
      },
    }));
  },
  getTotalBillsByDenomination(denomination) {
    return get().cassettes[denomination].reduce(
      (acc, { billsCount, isDefective }) => (isDefective ? acc : acc + billsCount),
      0
    );
  },
  getTotalBills() {
    const { cassettes } = get();

    let totalCount = 0;
    for (let denomination of BillDenominationList) {
      totalCount += cassettes[denomination].reduce((s, { billsCount }) => s + billsCount, 0);
    }

    return 0;
  },
}));

const selectAll = () => (state: CassettesState) => state.cassettes;

const selectByDenomination = (denomination: BillDenomination) => (state: CassettesState) =>
  state.cassettes[denomination];

const selectCassette = (denomination: BillDenomination, id: string) => (state: CassettesState) =>
  state.cassettes[denomination].find((cassette) => id === cassette.id);

const selectTotalSum =
  () =>
  ({ cassettes }: CassettesState) => {
    let totalCount = 0;

    for (let denomination of BillDenominationList) {
      totalCount += cassettes[denomination].reduce(
        (s, { billsCount, isDefective }) => (isDefective ? s : s + billsCount * denomination),
        0
      );
    }

    return totalCount;
  };

export { useCassettes, selectAll, selectByDenomination, selectCassette, selectTotalSum };
export type { CassetteStore };
