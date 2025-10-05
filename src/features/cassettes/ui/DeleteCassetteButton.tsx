import { useCassettes } from "@/entities/cassettes";
import { Button } from "@/shared/ui";

import type { BillDenomination } from "@/entities/cassettes";

interface DeleteCassetteButtonProps extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
  denomination: BillDenomination;
  id: string;
}

export const DeleteCassetteButton: React.FC<DeleteCassetteButtonProps> = ({
  denomination,
  id,
  children,
  variant = "destructive",
  size = "sm",
  ...props
}) => {
  const { deleteCassette } = useCassettes();

  return (
    <Button variant={variant} size={size} onClick={() => deleteCassette(denomination, id)} {...props}>
      {children}
    </Button>
  );
};
