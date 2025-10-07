import "./styles.css";

import { Bill } from "@/widgets/bills-spinner/ui/Bill";

export const BillsSpinner = () => {
  return (
    <div className="scene">
      <div className="spinner">
        {Array(40)
          .fill(null)
          .map((_, i, arr) => (
            <Bill
              key={i}
              style={{
                "--index": i,
                "--total": arr.length,
              }}
            />
          ))}
      </div>
    </div>
  );
};
