import React, { useEffect, useState } from "react";

export interface IGrumpy {
  amount?: number;
}

const Grumpy: React.FC<IGrumpy> = (props: IGrumpy) => {
  const { amount } = props;
  const [smiley, setSmiley] = useState("😑");
  // Similar to componentDidMount and componentDidUpdate:

  useEffect(() => {
    if (amount >= 900000) {
      setSmiley("💣");
      return;
    } else if (amount >= 400000) {
      setSmiley("🔥");
      return;
    } else if (amount >= 100000) {
      setSmiley("😡");
      return;
    } else {
      setSmiley("😑");
    }
  }, [amount]);

  return <span data-testid="grumpy">{smiley}</span>;
};

export default Grumpy;

// if (amount > 400000) return <data-testid="grumpy"></>;
// if (amount > 100000) return <data-testid="grumpy">😡</>;

// return <data-testid="grumpy">😑</data-testid=>;
