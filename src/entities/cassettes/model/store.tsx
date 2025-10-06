import { create } from "zustand";

import { BillDenominationList } from "@/entities/cassettes/lib";
import { UUID } from "@/shared/lib";

import type { BillDenomination, Cassette } from "@/entities/cassettes/model/types";
interface CassettesState {
  cassettes: Record<BillDenomination, Array<Cassette>>;
}

interface CassetteActions {
  addCassette: (denomination: BillDenomination, cassette: Cassette) => void;
  setBillsCount: (denomination: BillDenomination, id: string, count: number | null) => void;
  toggleDefective: (denomination: BillDenomination, id: string) => void;
  deleteCassette: (denomination: BillDenomination, id: string) => void;
  getTotalBillsByDenomination: (denomination: BillDenomination) => number;
  getAllCassettes: () => Cassette[];
}

interface CassettesStore extends CassettesState, CassetteActions {}

const initialState: CassettesState = {
  cassettes: BillDenominationList.reduce(
    (acc, denomination) => ({
      ...acc,
      [denomination]: [{ id: UUID(), denomination, isDefective: false, billsCount: 100 }],
    }),
    {} as Record<BillDenomination, Array<Cassette>>
  ),
};

const useCassettesStore = create<CassettesStore>()((set, get) => ({
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
          cassette.id == id ? { ...cassette, billsCount: count !== null ? Math.max(0, count) : null } : cassette
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
  getAllCassettes() {
    return Object.entries(get().cassettes).reduce((acc, entry) => acc.concat(entry[1]), [] as Cassette[]);
  },
}));

const selectAllCassettes = (state: CassettesStore) =>
  Object.entries(state.cassettes).reduce((acc, entry) => acc.concat(entry[1]), [] as Cassette[]);

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

const selectBillsCount =
  (denomination: BillDenomination) =>
  ({ cassettes }: CassettesState) => {
    return cassettes[denomination].reduce(
      (acc, { billsCount, isDefective }) => (isDefective ? acc : acc + billsCount),
      0
    );
  };

export {
  useCassettesStore,
  selectAllCassettes,
  selectByDenomination,
  selectCassette,
  selectTotalSum,
  selectBillsCount,
};
export type { CassettesStore };
