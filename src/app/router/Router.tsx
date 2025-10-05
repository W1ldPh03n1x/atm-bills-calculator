import { Route, Routes } from "react-router";

import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";
import { Layout } from "@/shared/ui";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage></HomePage>}></Route>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};
