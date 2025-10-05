import { Route, Routes } from "react-router";

import { CassettesSettingsPage, HomePage, NotFoundPage } from "@/pages";
import { ROUTES } from "@/shared/constants";
import { Layout } from "@/shared/ui";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<Layout />}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path={ROUTES.cassetteSettings} element={<CassettesSettingsPage></CassettesSettingsPage>}></Route>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};
