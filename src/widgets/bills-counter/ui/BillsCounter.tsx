import { MinusIcon, PlusIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useBillsCalculatorStore } from "@/entities/calculator";
import { BillsCount, useCassettesStore } from "@/entities/cassettes";
import { cn } from "@/shared/lib";
import { Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/shared/ui";

import type { BillDenomination } from "@/entities/cassettes";
interface BillsCounterProps {
  denomination: BillDenomination;
  targetCount: number;
  disabled?: boolean;
}

export const BillsCounter: React.FC<BillsCounterProps> = ({ denomination, targetCount, disabled }) => {
  const { getTotalBillsByDenomination } = useCassettesStore();
  const { setTargetSum, targetSum, incrementBills, decrementBills } = useBillsCalculatorStore();

  const maxBills = useMemo(
    () => getTotalBillsByDenomination(denomination),
    [getTotalBillsByDenomination, denomination]
  );

  const handleDecrement = useCallback(() => {
    decrementBills(denomination);
  }, [decrementBills]);

  const handleIncrement = useCallback(() => {
    incrementBills(denomination);
  }, [incrementBills]);

  const isDisabled = disabled || maxBills === 0;
  const canDecrement = !isDisabled && targetCount > 0 && maxBills !== 0;
  const canIncrement = !isDisabled && targetCount < maxBills && maxBills !== 0;

  return (
    <ButtonGroup className="border-gradient rounded-3xl max-md:rounded-xl ">
      <Button variant="group" size="lg" className="h-19" disabled={!canDecrement} onClick={handleDecrement}>
        <MinusIcon className="size-6" />
      </Button>

      <ButtonGroupSeparator className="bg-foreground/30" />

      <ButtonGroupText className={cn("px-0 w-38 text-xl max-md:text-lg max-md:w-30", isDisabled && "opacity-50")}>
        <BillsCount denomination={denomination} count={targetCount} />
      </ButtonGroupText>

      <ButtonGroupSeparator className="bg-foreground/30" />

      <Button variant="group" size="lg" className="h-19" disabled={!canIncrement} onClick={handleIncrement}>
        <PlusIcon className="size-6" />
      </Button>
    </ButtonGroup>
  );
};
