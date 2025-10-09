import { BillDenominationList } from "@/entities/cassettes";

import type { BillDenomination, Cassette } from "@/entities/cassettes";

export function calculateOptimalBillsDecomposition(
  targetSum: number,
  cassettes: Cassette[]
): Map<BillDenomination, number> | null {
  if (targetSum === 0) {
    return BillDenominationList.reduce(
      (map, denomination) => map.set(denomination, 0),
      new Map<BillDenomination, number>()
    );
  }

  if (targetSum % 100 !== 0) {
    return null;
  }

  const availableBillsCount: Record<BillDenomination, number> = BillDenominationList.reduce(
    (acc, denom) => ({ ...acc, [denom]: 0 }),
    {} as Record<BillDenomination, number>
  );

  for (let cassette of cassettes) {
    if (!cassette.isDefective) availableBillsCount[cassette.denomination] += cassette.billsCount;
  }

  const limits = BillDenominationList.map((denom) => availableBillsCount[denom]);

  const totalAvailable = BillDenominationList.reduce((acc, denom) => acc + availableBillsCount[denom] * denom, 0);
  if (totalAvailable < targetSum) {
    return null;
  }

  const decomposition = simpleDecomposition(targetSum, limits);
  if (decomposition) return decomposition;

  return dynamicDecomposition(targetSum, limits);
}

function dynamicDecomposition(targetSum: number, limits: number[]) {
  const reducedN = targetSum / 100;
  const reducedDenominations = [1, 2, 5, 10, 20, 50];

  const calculatedSums: number[] = new Array(reducedN + 1).fill(Infinity);
  const decompositions: number[][] = new Array(reducedN + 1);

  calculatedSums[0] = 0;
  decompositions[0] = [0, 0, 0, 0, 0, 0];

  const indexes = [5, 4, 3, 2, 1, 0];

  for (const i of indexes) {
    const billDenomination = reducedDenominations[i];
    const limit = limits[i];

    if (limit === 0) continue;

    const newСalculatedSums = [...calculatedSums];
    const newDecompositions = [...decompositions];

    for (let remainder = 0; remainder < billDenomination; remainder++) {
      const queue: [number, number][] = [];

      for (let billsCount = 0; remainder + billsCount * billDenomination <= reducedN; billsCount++) {
        const currentSum = remainder + billsCount * billDenomination;

        while (queue.length > 0 && billsCount - queue[0][0] > limit) {
          queue.shift();
        }

        if (calculatedSums[currentSum] < Infinity) {
          const value = calculatedSums[currentSum] - billsCount;

          while (queue.length > 0 && queue.at(-1)![1] >= value) {
            queue.pop();
          }
          queue.push([billsCount, value]);
        }

        if (queue.length > 0) {
          const [bestBillsCount, bestValue] = queue[0];
          const bestSum = remainder + bestBillsCount * billDenomination;
          const billsUsed = billsCount - bestBillsCount;
          const newMinBillsForSum = calculatedSums[bestSum] + billsUsed;

          if (newMinBillsForSum < newСalculatedSums[currentSum]) {
            newСalculatedSums[currentSum] = newMinBillsForSum;

            newDecompositions[currentSum] = [...decompositions[bestSum]];
            newDecompositions[currentSum][i] += billsUsed;
          }
        }
      }
    }

    for (let s = 0; s <= reducedN; s++) {
      calculatedSums[s] = newСalculatedSums[s];
      decompositions[s] = newDecompositions[s];
    }
  }

  if (calculatedSums[reducedN] === Infinity) {
    return null;
  }

  return convertToDenominationMap(decompositions[reducedN]);
}

function simpleDecomposition(targetSum: number, limits: number[]) {
  let remnant = targetSum;

  const decomposition: number[] = [];

  const indexes = [5, 4, 3, 2, 1, 0];

  for (let i of indexes) {
    const denomination = BillDenominationList[i];
    decomposition[i] = 0;
    if (limits[i] === 0) continue;
    const requiredBills = Math.min(Math.floor(remnant / denomination), limits[i]!);
    remnant -= requiredBills * denomination;
    decomposition[i] = requiredBills;
  }
  if (remnant !== 0) return null;
  return convertToDenominationMap(decomposition);
}

function convertToDenominationMap(decomposition: number[]) {
  const result = new Map<BillDenomination, number>();
  const indexToDenomination: Record<number, BillDenomination> = {
    0: 100,
    1: 200,
    2: 500,
    3: 1000,
    4: 2000,
    5: 5000,
  };

  for (let i = 0; i < 6; i++) {
    result.set(indexToDenomination[i], decomposition[i]);
  }

  return result;
}
