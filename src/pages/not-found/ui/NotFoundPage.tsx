import { Link2OffIcon } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/shared/ui";

export const NotFoundPage = () => {
  return (
    <div className="flex pb-40 h-full flex-col justify-center items-center">
      <Link2OffIcon className="size-32" />
      <div className="flex flex-col gap-4 items-center">
        <div className="text-6xl font-bold">Страница не найдена!</div>
        <div className="text-2xl text-muted-foreground font-bold">Страница, которую вы ищете, не существует.</div>
      </div>
      <Link to="/" className="mt-8">
        <Button>На главную</Button>
      </Link>
    </div>
  );
};
