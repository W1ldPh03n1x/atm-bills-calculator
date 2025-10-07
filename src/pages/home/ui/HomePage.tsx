import { CalculatorIcon, Settings2Icon } from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "@/shared/constants";
import { Button, Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui";

export const HomePage = () => {
  return (
    <div className="min-h-full flex flex-col justify-center pb-30">
      <div className="container mx-auto flex gap-12 justify-center items-stretch flex-wrap">
        <Card className="w-120 max-sm:w-90">
          <CardHeader>
            <CardTitle>Рассчитать вывод купюр</CardTitle>

            <CardDescription>
              Получить подробную информацию о том, сколько купюр доступно. Рассчитать необходимое количество купюр для
              выдачи заданной суммы.
            </CardDescription>

            <CardAction>
              <CalculatorIcon className="text-muted-foreground size-24 mx-auto" />
            </CardAction>
          </CardHeader>

          <CardFooter className="flex justify-start">
            <Link to={ROUTES.billsCalculator}>
              <Button>Перейти</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="w-120 max-sm:w-90">
          <CardHeader>
            <CardTitle>Настроить количество кассет</CardTitle>

            <CardDescription>Настроить количество кассет с купюрами, находящихся в банкомате.</CardDescription>

            <CardAction>
              <Settings2Icon className="text-muted-foreground size-24 mx-auto" />
            </CardAction>
          </CardHeader>

          <CardFooter className="flex justify-start mt-auto">
            <Link to={ROUTES.cassetteSettings}>
              <Button>Перейти</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
