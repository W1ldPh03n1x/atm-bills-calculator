import { calculateOptimalBillsDecomposition, useBillsCalculatorStore } from "@/entities/calculator";
import { BillDenominationList, useCassettesStore } from "@/entities/cassettes";
import { CalculatorTargetSumInput } from "@/features/calculator";
import { cn, useScroll } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { BankCardPreview } from "@/widgets/bank-card-preview";
import { BillsCounter } from "@/widgets/bills-counter";

export const CalculatorPage = () => {
  const { isScrolled } = useScroll();
  const { getAllCassettes } = useCassettesStore();
  const { targetSum, customDecomposition, optimalDecomposition, setOptimalDecomposition } = useBillsCalculatorStore();
  const decomposition = customDecomposition || optimalDecomposition;

  return (
    <div
      className={cn("flex relative flex-col items-center container mx-auto pt-22 duration-200", isScrolled && "pb-12")}
    >
      <div className={cn("absolute -top-29 left-1/2 -translate-x-1/2 -translate-y-1/3 duration-200")}>
        <BankCardPreview />
      </div>

      <div className="flex flex-col items-center">
        <CalculatorTargetSumInput
          className="w-full"
          onTargetSumChange={(targetSum) => {
            setOptimalDecomposition(
              targetSum === null
                ? calculateOptimalBillsDecomposition(0, [])
                : calculateOptimalBillsDecomposition(targetSum, getAllCassettes())
            );
          }}
        />
        {!optimalDecomposition && <div className="text-destructive text-xl">Мы не можем сейчас выдать эту сумму.</div>}
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-md:gap-6 justify-center gap-10 mt-10">
        {BillDenominationList.map((denomination) => (
          <BillsCounter
            key={denomination}
            denomination={denomination}
            targetCount={(decomposition && decomposition.get(denomination)) || 0}
            disabled={!decomposition}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center items-center gap-4 mt-16">
        <span>Мы не берём комиссию за снятие</span>
        <Button size="lg" variant="successful" disabled={!decomposition || !targetSum}>
          Снять наличные
        </Button>
      </div>
    </div>
  );
};
