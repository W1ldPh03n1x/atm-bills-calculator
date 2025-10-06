import { Link, useLocation } from "react-router";

import { ROUTES } from "@/shared/constants";
import { cn, useScroll } from "@/shared/lib";
import { Button } from "@/shared/ui/";

export const Header = () => {
  const location = useLocation();
  const { isScrolled } = useScroll();

  return (
    <header
      className={cn(
        "flex fixed top-0 left-0 right-0 p-8 pb-6 max-sm:p-4 justify-between items-center gap-4 z-100",
        isScrolled && "backdrop-blur-2xl"
      )}
    >
      <div>
        <Link to={ROUTES.root}>
          <Button size="lg" disabled={location.pathname === ROUTES.root}>
            Назад
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-4 ">
        <div className="flex flex-wrap justify-end basis-40 gap-2 text-4xl font-[100] scale-y-75  tracking-tighter max-sm:text-2xl">
          <div className="font-extrabold">TM</div> <div>BANK</div>
        </div>

        <Button size="lg">Уйти</Button>
      </div>
    </header>
  );
};
