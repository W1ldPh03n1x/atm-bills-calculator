import type { BillDenomination } from "@/entities/cassettes/model";
import { formatAmount } from "@/shared/lib";

interface BillsCountProps {
  denomination: BillDenomination;
  count: number;
}

export const BillsCount: React.FC<BillsCountProps> = ({ denomination, count }) => {
  return (
    <div>
      {formatAmount(denomination)} <span className="text-foreground/30">₽ &times;</span> {count}
    </div>
  );
};
