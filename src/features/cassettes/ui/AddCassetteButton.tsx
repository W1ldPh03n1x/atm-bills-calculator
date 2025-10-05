import { PlusIcon } from "lucide-react";

import { useCassettes } from "@/entities/cassettes";
import { Button } from "@/shared/ui";

import type { BillDenomination } from "@/entities/cassettes";
interface AddCassetteButtonProps {
  denomination: BillDenomination;
}

export const AddCassetteButton: React.FC<AddCassetteButtonProps> = ({ denomination }) => {
  const { addCassette } = useCassettes();

  return (
    <Button
      size={"icon-sm"}
      className="px-0"
      onClick={() => addCassette(denomination, { id: "", billsCount: 100, denomination, isDefective: false })}
    >
      <PlusIcon className="size-6" />
    </Button>
  );
};
