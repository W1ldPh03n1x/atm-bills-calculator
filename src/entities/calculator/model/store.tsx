import { create } from "zustand";

import { calculateOptimalBillsDecomposition } from "@/entities/calculator/lib";

import type { BillDenomination } from "@/entities/cassettes";
interface CalculatorState {
  targetSum: number | null;
  customDecomposition: Map<BillDenomination, number> | null;
  optimalDecomposition: Map<BillDenomination, number> | null;
}

interface CalculatorActions {
  setTargetSum: (sum: number | null) => void;
  incrementBills: (denomination: BillDenomination) => void;
  decrementBills: (denomination: BillDenomination) => void;
  setOptimalDecomposition: (decomposition: Map<BillDenomination, number> | null) => void;
  reset: () => void;
}

interface CalculatorStore extends CalculatorState, CalculatorActions {}

const initialState: CalculatorState = {
  targetSum: 0,
  customDecomposition: null,
  optimalDecomposition: calculateOptimalBillsDecomposition(0, []),
};

const useBillsCalculatorStore = create<CalculatorStore>()((set, get) => ({
  ...initialState,
  setTargetSum(sum) {
    if (sum !== null) {
      const targetSum = sum < 0 ? 0 : sum;

      set({ targetSum });
    } else {
      set({ targetSum: null });
    }
  },
  incrementBills(denomination) {
    set((state) => {
      const customDecomposition =
        state.customDecomposition || new Map(state.optimalDecomposition || calculateOptimalBillsDecomposition(0, []));
      customDecomposition.set(denomination, (customDecomposition.get(denomination) || 0) + 1);

      const newTargetSum = state.targetSum !== null ? state.targetSum + 1 * denomination : null;

      return { customDecomposition, targetSum: newTargetSum };
    });
  },
  decrementBills(denomination) {
    set((state) => {
      const customDecomposition =
        state.customDecomposition || new Map(state.optimalDecomposition || calculateOptimalBillsDecomposition(0, []));
      customDecomposition.set(denomination, (customDecomposition.get(denomination) || 0) - 1);

      const newTargetSum = state.targetSum !== null ? Math.max(state.targetSum - 1 * denomination, 0) : null;

      return { customDecomposition, targetSum: newTargetSum };
    });
  },
  setOptimalDecomposition(decomposition) {
    set((state) => ({ optimalDecomposition: decomposition, customDecomposition: null }));
  },
  reset() {
    return { ...initialState };
  },
}));

export { useBillsCalculatorStore };
