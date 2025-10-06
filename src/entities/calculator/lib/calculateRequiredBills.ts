import { BillDenominationList } from "@/entities/cassettes";

import type { BillDenomination, Cassette } from "@/entities/cassettes";

export function calculateRequiredBillsDecomposition(
  targetSum: number,
  cassettes: Cassette[]
): Map<BillDenomination, number> | null {
  console.time();

  if (targetSum === 0) {
    console.timeEnd();
    return BillDenominationList.reduce(
      (map, denomination) => map.set(denomination, 0),
      new Map<BillDenomination, number>()
    );
  }

  const availableBillsCount = new Map<BillDenomination, number>();
  const decomposition = new Map<BillDenomination, number>();

  for (let cassette of cassettes) {
    if (!cassette.isDefective)
      availableBillsCount.set(
        cassette.denomination,
        (availableBillsCount.get(cassette.denomination) || 0) + cassette.billsCount
      );
  }

  let remnant = targetSum;

  for (let i = 0; i < BillDenominationList.length; i++) {
    const denomination = BillDenominationList.at(-i - 1)!;
    decomposition.set(denomination, 0);

    if (denomination && !availableBillsCount.get(denomination)) continue;

    const requiredBills = Math.min(Math.floor(remnant / denomination), availableBillsCount.get(denomination)!);

    remnant -= requiredBills * denomination;

    decomposition.set(denomination, requiredBills);
  }
  console.log(targetSum, remnant, decomposition);

  console.timeEnd();
  if (remnant) return null;

  return decomposition;
}
