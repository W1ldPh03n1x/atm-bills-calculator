import { GlobeIcon } from "lucide-react";

import { Button } from "@/shared/ui";

export const Footer = () => {
  return (
    <div className="flex fixed bottom-8 left-8 right-8 justify-between z-10">
      <Button size="icon-lg">
        <GlobeIcon className="size-6" />
      </Button>
    </div>
  );
};
