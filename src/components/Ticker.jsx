import { useState } from "react";
import styles from "../styles/Ticker.module.css";

export const Ticker = (props) => {
  const [instrument, changeInstrument] = useState("CNH/RUB");
  const [amount, changeAmount] = useState(0);
  const [sellPrice, changeSellPrice] = useState(0);
  const [buyPrice, changeBuyPrice] = useState(0);

  props.eventBus.addPriceFuncs({ sell: changeSellPrice, buy: changeBuyPrice });

  const handleAmount = (e) => {
    changeAmount(e.target.value.replace(/[^\d.]/gi, ""));
  };

  const makeDeal = (type) => {
    amount > 0 && props.eventBus.send({ amount, instrument, type, sellPrice });
    changeAmount(0);
  };

  return (
    <div className={styles.ticker}>
      <select onChange={(e) => changeInstrument(e.target.value)}>
        <option value="CNH/RUB">CNH/RUB</option>
        <option value="EUR/RUB">EUR/RUB</option>
        <option value="USD/RUB">USD/RUB</option>
        <option value="TRY/RUB">TRY/RUB</option>
        <option value="BYN/RUB">BYN/RUB</option>
        <option value="EUR/USD">EUR/USD</option>
      </select>
      <input
        type="text"
        onChange={handleAmount}
        value={new Intl.NumberFormat("ru-RU").format(amount)}
      />
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>{sellPrice}</span>
          <button className={styles.red} onClick={() => makeDeal("Sell")}>
            SELL
          </button>
        </div>
        <div className={styles.control}>
          <span>{buyPrice}</span>
          <button className={styles.green} onClick={() => makeDeal("Buy")}>
            BUY
          </button>
        </div>
      </div>
    </div>
  );
};
