import { BillDenominationList, BillsCount, selectAll, useCassettes } from "@/entities/cassettes";
import { selectTotalSum } from "@/entities/cassettes/model";
import { AddCassetteButton, DeleteCassetteButton, SwitchCassetteDefective } from "@/features/cassettes";
import { Card, CardAction, CardFooter, CardHeader, CardTitle, ScrollArea } from "@/shared/ui";
import { MoneyPreview } from "@/shared/ui/common/MoneyPreview";
import { CassetteEditList } from "@/widgets/cassette-edit-list/ui/CassetteEditList";
import { PopoverMenu } from "@/widgets/menu";

export const CassettesSettingsPage = () => {
  const { getTotalBills } = useCassettes();
  const cassettes = useCassettes(selectAll());
  const totalMoney = useCassettes(selectTotalSum());

  return (
    <div className="min-h-full flex flex-col justify-center pb-30 gap-8 items-center">
      <h1 className="text-5xl max-sm:text-3xl text-center px-2">
        Общая сумма в банкомате: <MoneyPreview amount={totalMoney} />
      </h1>

      <div className="container mx-auto flex gap-8 justify-center items-stretch flex-wrap">
        {BillDenominationList.map((denomination) => (
          <Card key={denomination} className="w-80">
            <CardHeader>
              <CardTitle>
                <BillsCount denomination={denomination} count={getTotalBills()} />
              </CardTitle>

              <CardAction>
                <AddCassetteButton denomination={denomination} />
              </CardAction>
            </CardHeader>

            <CardFooter>
              <ScrollArea className="h-[200px] w-full">
                <CassetteEditList
                  cassettes={cassettes[denomination]}
                  action={(cassette) => (
                    <PopoverMenu className="w-60">
                      <div className="flex flex-col gap-4">
                        <SwitchCassetteDefective cassette={cassette} label="Кассета неисправна" />

                        <DeleteCassetteButton
                          denomination={cassette.denomination}
                          id={cassette.id}
                          disabled={cassettes[denomination].length === 1}
                        >
                          Удалить кассету
                        </DeleteCassetteButton>
                      </div>
                    </PopoverMenu>
                  )}
                ></CassetteEditList>
              </ScrollArea>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
