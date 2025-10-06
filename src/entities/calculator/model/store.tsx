import { create } from "zustand";

interface CalculatorState {
  targetSum: number | null;
}

interface CalculatorActions {
  setTargetSum: (sum: number | null) => void;
}

interface CalculatorStore extends CalculatorState, CalculatorActions {}

const initialState: CalculatorState = {
  targetSum: null,
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
}));

export { useBillsCalculatorStore };
