import "./styles.css";

import { cn } from "@/shared/lib";

import type { ClassNameProp } from "@/shared/types";

interface BankCardPreviewProps extends ClassNameProp {}

export const BankCardPreview: React.FC<BankCardPreviewProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div className="w-100 h-60 flex flex-col justify-center items-center rounded-3xl bank-card-border-gradient bg-white/5 backdrop-blur-2xl relative shadow-xl/30">
        <div className="flex w-full justify-between items-center px-6">
          <img src="/assets/chip.svg" alt="card chip" />
          <div className="text-3xl jetbrains-mono font-bold bank-card-gradient-text text-shadow-2xs ">**** 0042</div>
        </div>
        <div className="absolute bottom-4 flex justify-center items-center w-full px-6">
          <div className="text-md">Показать баланс</div>
          <img className="absolute right-6" src="/assets/mir_logo.svg" alt="mir logo" />
        </div>
      </div>
    </div>
  );
};
