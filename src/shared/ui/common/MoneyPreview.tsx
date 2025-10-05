import { formatAmount } from "@/shared/lib";

interface MoneyPreviewProps {
  amount: number;
}

export const MoneyPreview: React.FC<MoneyPreviewProps> = ({ amount }) => {
  return (
    <div className="text-nowrap">
      {formatAmount(amount)} <span className="text-foreground/50">₽</span>
    </div>
  );
};
