import { useCallback, useState } from "react";

import { useBillsCalculatorStore } from "@/entities/calculator";
import { cn, formatAmount, parseFormattedAmount } from "@/shared/lib";

import type { ClassNameProp } from "@/shared/types";

interface CalculatorTargetSumInput extends ClassNameProp {}

export const CalculatorTargetSumInput: React.FC<CalculatorTargetSumInput> = ({ className }) => {
  const { setTargetSum, targetSum } = useBillsCalculatorStore();
  const [formattedInputValue, setFormattedInputValue] = useState("");

  const handleInputChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const parsedAmount = parseFormattedAmount(target.value);

      setTargetSum(target.value ? parsedAmount : null);
      setFormattedInputValue(target.value ? String(formatAmount(parsedAmount)) : "");
    },
    [setTargetSum, setFormattedInputValue]
  );

  const handleBlur = () => {
    setFormattedInputValue((value) => (value !== "" ? value + " ₽" : ""));
  };

  const handleFocus = () => {
    setFormattedInputValue((value) => value.replace(" ₽", ""));
  };

  return (
    <input
      name="moneyToTake"
      onChange={handleInputChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={formattedInputValue}
      className={cn(
        "border-none bg-transparent dark:bg-transparent focus-visible:border-none h-32 !text-8xl text-foreground font-bold hanken-grotesk truncate text-center",
        className
      )}
      placeholder="Введите сумму"
    />
  );
};
