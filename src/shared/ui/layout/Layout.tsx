import { Outlet } from "react-router";

import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="flex  h-full">
      <div className="flex-col grow">
        <Header />
        <main className="pt-29 h-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
