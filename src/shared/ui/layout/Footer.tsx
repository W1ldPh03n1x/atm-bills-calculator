import { GlobeIcon } from "lucide-react";

import { Button } from "@/shared/ui";

export const Footer = () => {
  return (
    <div className="flex fixed bottom-8 left-8 max-sm:bottom-4 max-sm:left-4 justify-between z-100">
      <Button size="icon-lg">
        <GlobeIcon className="size-6" />
      </Button>
    </div>
  );
};
