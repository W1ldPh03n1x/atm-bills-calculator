import { EllipsisVerticalIcon } from "lucide-react";

import { cn } from "@/shared/lib";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";

import type { ChildrenProp, ClassNameProp } from "@/shared/types";
interface PopoverMenuProps extends ChildrenProp, ClassNameProp {
  icon?: React.ReactNode;
}

export const PopoverMenu: React.FC<PopoverMenuProps> = ({ children, className, icon }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm">{icon || <EllipsisVerticalIcon className="size-4" />}</Button>
      </PopoverTrigger>

      <PopoverContent className={cn(className)}>{children}</PopoverContent>
    </Popover>
  );
};
