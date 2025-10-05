import { Route, Routes } from "react-router";

import { HomePage } from "@/pages/home";
import { Layout } from "@/shared/ui";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Route>
    </Routes>
  );
};
