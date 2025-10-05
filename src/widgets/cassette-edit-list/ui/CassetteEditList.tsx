import { CassetteBillsCountInput } from "@/features/cassettes/ui/CassetteBillsCountInput";
import { MoneyPreview } from "@/shared/ui/common/MoneyPreview";

import type { Cassette } from "@/entities/cassettes";
interface CassetteEditListProps {
  cassettes: Cassette[];
  withDenominationPreview?: boolean;
  action?: (cassette: Cassette) => React.ReactNode;
}

export const CassetteEditList: React.FC<CassetteEditListProps> = ({ cassettes, withDenominationPreview, action }) => {
  return (
    <div className="flex flex-col gap-2 w-full p-1">
      {cassettes.map((cassette) => (
        <div key={cassette.id} className="flex gap-2 items-center">
          {withDenominationPreview && <MoneyPreview amount={cassette.denomination} />}

          <CassetteBillsCountInput denomination={cassette.denomination} id={cassette.id} />

          <div>{action && action(cassette)}</div>
        </div>
      ))}
    </div>
  );
};
