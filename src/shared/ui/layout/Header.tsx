import { Link, useLocation } from "react-router";

import { Button } from "@/shared/ui/";

export const Header = () => {
  const location = useLocation();
  return (
    <div className="flex fixed top-8 left-8 right-8 max-sm:left-4 max-sm:top-4 max-sm:right-4 justify-between items-center gap-4 z-10">
      <div>
        <Link to="/">
          <Button disabled={location.pathname === "/"}>Назад</Button>
        </Link>
      </div>
      <div className="flex items-center gap-4 ">
        <div className="flex flex-wrap justify-end basis-40 gap-2 text-4xl font-[100] scale-y-75 tracking-tighter max-sm:text-2xl">
          <div className="font-extrabold">TM</div> <div>BANK</div>
        </div>

        <Button>Уйти</Button>
      </div>
    </div>
  );
};
