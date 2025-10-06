import { Route, Routes } from "react-router";

import { CassettesSettingsPage, HomePage, NotFoundPage } from "@/pages";
import { CalculatorPage } from "@/pages/calculator";
import { ROUTES } from "@/shared/constants";
import { Layout } from "@/shared/ui";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<Layout />}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path={ROUTES.cassetteSettings} element={<CassettesSettingsPage></CassettesSettingsPage>}></Route>
        <Route path={ROUTES.billsCalculator} element={<CalculatorPage></CalculatorPage>}></Route>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};
