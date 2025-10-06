import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function UUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function sum(...nums: number[]): number {
  return nums.reduce((s, n) => s + n, 0);
}

export function formatAmount(
  amount: number | string,
  options: {
    separator?: string;
    decimalSeparator?: string;
    decimalPlaces?: number;
  } = {}
): string {
  const { separator = " ", decimalSeparator = ",", decimalPlaces = 0 } = options;

  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return "0";
  }

  const [integerPart, decimalPart = ""] = num.toFixed(decimalPlaces).split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  if (decimalPlaces > 0 && decimalPart) {
    return `${formattedInteger}${decimalSeparator}${decimalPart}`;
  }

  return formattedInteger;
}

export function parseFormattedAmount(
  formattedValue: string,
  options: {
    separator?: string;
    decimalSeparator?: string;
  } = {}
): number {
  const { separator = " ", decimalSeparator = "," } = options;

  if (!formattedValue || formattedValue.trim() === "") {
    return 0;
  }

  let cleanedValue = formattedValue.replace(new RegExp(`\\${separator}`, "g"), "");

  cleanedValue = cleanedValue.replace(decimalSeparator, ".");

  cleanedValue = cleanedValue.replace(/[^\d.-]/g, "");

  if (cleanedValue === "" || cleanedValue === "-") {
    return 0;
  }

  const parsed = parseFloat(cleanedValue);

  return isNaN(parsed) ? 0 : parsed;
}
