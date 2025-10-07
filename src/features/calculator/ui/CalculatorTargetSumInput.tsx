import { useCallback, useEffect, useState } from "react";

import { useBillsCalculatorStore } from "@/entities/calculator";
import { cn, formatAmount, parseFormattedAmount } from "@/shared/lib";

import type { ClassNameProp } from "@/shared/types";

interface CalculatorTargetSumInput extends ClassNameProp {
  onTargetSumChange?: (targetSum: number | null) => void;
}

export const CalculatorTargetSumInput: React.FC<CalculatorTargetSumInput> = ({ className, onTargetSumChange }) => {
  const { setTargetSum, targetSum } = useBillsCalculatorStore();
  const [formattedInputValue, setFormattedInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const parsedAmount = parseFormattedAmount(target.value);

      const newTargetSum = target.value ? parsedAmount : null;
      setTargetSum(newTargetSum);
      onTargetSumChange && onTargetSumChange(newTargetSum);
      setFormattedInputValue(String(parsedAmount));
    },
    [setTargetSum, setFormattedInputValue, onTargetSumChange]
  );

  useEffect(() => {
    if (!isFocused) {
      setFormattedInputValue(targetSum ? formatAmount(targetSum || 0) + " ₽" : "");
    }
  }, [targetSum]);

  const handleBlur = () => {
    setIsFocused(false);
    onTargetSumChange && onTargetSumChange(targetSum);
    setFormattedInputValue(targetSum ? formatAmount(targetSum || 0) + " ₽" : "");
  };

  const handleFocus = () => {
    setIsFocused(true);
    setFormattedInputValue(String(targetSum || 0));
  };

  return (
    <input
      name="moneyToTake"
      onChange={handleInputChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={formattedInputValue}
      className={cn(
        "border-none bg-transparent dark:bg-transparent focus-visible:border-none h-32 text-8xl max-md:text-6xl text-foreground font-bold hanken-grotesk truncate text-center",
        className
      )}
      placeholder="Введите сумму"
    />
  );
};
