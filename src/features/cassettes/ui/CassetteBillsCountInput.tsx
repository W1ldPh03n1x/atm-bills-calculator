import React from "react";

import { useCassettesStore } from "@/entities/cassettes";
import { selectCassette } from "@/entities/cassettes/model/store";
import { Input } from "@/shared/ui";

import type { BillDenomination } from "@/entities/cassettes";

interface CassetteBillsCountInputProps
  extends Omit<React.ComponentProps<typeof Input>, "name" | "onChange" | "type" | "value"> {
  id: string;
  denomination: BillDenomination;
}

export const CassetteBillsCountInput: React.FC<CassetteBillsCountInputProps> = ({ id, denomination, ...props }) => {
  const { setBillsCount } = useCassettesStore();
  const cassette = useCassettesStore(selectCassette(denomination, id));

  const handleInput = React.useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setBillsCount(denomination, id, target.value !== "" ? Number(target.value) : null);
    },
    [setBillsCount, cassette?.billsCount]
  );

  return (
    <Input
      name={`cassettes[${id}].count`}
      value={cassette?.billsCount !== null ? cassette?.billsCount : ""}
      onChange={handleInput}
      type="number"
      placeholder="Введите количество"
      {...props}
    />
  );
};
