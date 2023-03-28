import { Ticker } from "./Ticker";
import { OrderTable } from "./OrderTable";
import { WS } from "../webSocket";
import { EventBus } from "../eventBus";
import styles from "../styles/App.module.css";

export const App = () => {
  const eb = new EventBus(new WS());
  return (
    <div className={styles.app}>
      <Ticker eventBus={eb} />
      <OrderTable eventBus={eb} />
    </div>
  );
};
