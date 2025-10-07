interface BillProps {
  style?: any;
}

export const Bill: React.FC<BillProps> = ({ style }) => {
  return (
    <div className="bill-container" style={style}>
      <div className="bill">
        <div className="bill-face bill-face-front">
          <span className="denomination denomination-top">100</span>
          <span>TM</span>
          <span className="denomination denomination-bottom">100</span>
        </div>
        <div className="bill-face bill-face-back">
          <span className="denomination denomination-top">100</span>
          <span>TM</span>
          <span className="denomination denomination-bottom">100</span>
        </div>
        <div className="bill-edge bill-edge-right"></div>
        <div className="bill-edge bill-edge-left"></div>
        <div className="bill-edge bill-edge-top"></div>
        <div className="bill-edge bill-edge-bottom"></div>
      </div>
    </div>
  );
};
