import { Outlet } from "react-router";

import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="mt-30 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
