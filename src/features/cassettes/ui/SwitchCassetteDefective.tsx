import { useCassettes } from "@/entities/cassettes";
import { cn } from "@/shared/lib";
import { Label, Switch } from "@/shared/ui";

import type { Cassette } from "@/entities/cassettes";
import type { ClassNameProp } from "@/shared/types";

interface SwitchCassetteDefectiveProps extends ClassNameProp {
  cassette: Cassette;
  label: string;
}

export const SwitchCassetteDefective: React.FC<SwitchCassetteDefectiveProps> = ({ cassette, label, className }) => {
  const { toggleDefective } = useCassettes();
  return (
    <Label className={cn(className)}>
      <Switch
        checked={cassette.isDefective}
        onCheckedChange={() => toggleDefective(cassette.denomination, cassette.id)}
      />
      {label}
    </Label>
  );
};
