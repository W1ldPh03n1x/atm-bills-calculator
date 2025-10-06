import { useMemo } from "react";

import { calculateRequiredBillsDecomposition, useBillsCalculatorStore } from "@/entities/calculator";
import { BillsCount, useCassettesStore } from "@/entities/cassettes";
import { CalculatorTargetSumInput } from "@/features/calculator";
import { BankCardPreview } from "@/widgets/bank-card-preview";

export const CalculatorPage = () => {
  const { getAllCassettes } = useCassettesStore();
  const targetSum = useBillsCalculatorStore((store) => store.targetSum);

  const decomposition = useMemo(
    () => calculateRequiredBillsDecomposition(targetSum || 0, getAllCassettes()),
    [targetSum, getAllCassettes]
  );

  console.log(decomposition);

  return (
    <div className="flex flex-col items-center pt-22">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/3">
        <BankCardPreview />
      </div>

      <div className="container mx-auto justify-center items-stretch">
        <CalculatorTargetSumInput className="w-full" />
      </div>

      {[...(decomposition || [])].map((billsCount) => (
        <BillsCount key={billsCount[0]} denomination={billsCount[0]} count={billsCount[1]} />
      ))}
    </div>
  );
};
