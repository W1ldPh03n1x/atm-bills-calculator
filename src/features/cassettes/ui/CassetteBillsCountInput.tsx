import React from "react";

import { useCassettes } from "@/entities/cassettes";
import { selectCassette } from "@/entities/cassettes/model/store";
import { Input } from "@/shared/ui";

import type { BillDenomination } from "@/entities/cassettes";

interface CassetteBillsCountInputProps
  extends Omit<React.ComponentProps<typeof Input>, "name" | "onChange" | "type" | "value"> {
  id: string;
  denomination: BillDenomination;
}

export const CassetteBillsCountInput: React.FC<CassetteBillsCountInputProps> = ({ id, denomination, ...props }) => {
  const { setBillsCount } = useCassettes();
  const cassette = useCassettes(selectCassette(denomination, id));

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e);
      setBillsCount(denomination, id, Number(e.target.value));
    },
    [setBillsCount, cassette?.billsCount]
  );

  return (
    <Input
      name={`cassettes[${id}].count`}
      value={cassette?.billsCount}
      onChange={handleInput}
      type="number"
      placeholder="Введите количество"
      {...props}
    />
  );
};
