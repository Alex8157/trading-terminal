import { useState } from "react";
import styles from "../styles/OrderTable.module.css";

export const OrderTable = (props) => {
  const [orders, changeOrders] = useState([]);
  const [sort, setSort] = useState({ type: "id", method: 1 });

  props.eventBus.addOrderFunc((order) => {
    changeOrders([...orders, order]);
  });

  const changeSort = (type) => {
    setSort({ type, method: sort.method * -1 });
    changeOrders(
      [...orders].sort((a, b) => {
        return a[type] > b[type] ? sort.method : -sort.method;
      })
    );
  };

  return (
    <div className={styles.orderTable}>
      <div className={`${styles.order} ${styles.title}`}>
        <span className={styles.id} onClick={(e) => changeSort("id")}>
          Id
        </span>
        <span
          className={styles.date}
          onClick={(e) => changeSort("creationTime")}
        >
          CreationTime
        </span>
        <span className={styles.date} onClick={() => changeSort("changeTime")}>
          ChangeTime
        </span>
        <span className={styles.other} onClick={() => changeSort("status")}>
          Status
        </span>
        <span className={styles.other} onClick={() => changeSort("side")}>
          Side
        </span>
        <span className={styles.other} onClick={() => changeSort("price")}>
          Price
        </span>
        <span className={styles.other} onClick={() => changeSort("amount")}>
          Amount
        </span>
        <span className={styles.other} onClick={() => changeSort("instrument")}>
          Instrument
        </span>
      </div>
      {orders.length > 0 &&
        orders.map((order) => {
          return (
            <div className={styles.order} key={order.id}>
              <span className={styles.id}>{order.id}</span>
              <span className={styles.date}>
                {order.creationTime.replace(/[A-Z]/g, " ")}
              </span>
              <span className={styles.date}>
                {order.changeTime.replace(/[A-Z]/g, " ")}
              </span>
              <span className={styles.other}>{order.status}</span>
              <span className={`${styles.other} ${styles[order.side]}`}>
                {order.side}
              </span>
              <span className={`${styles.other} ${styles[order.side]}`}>
                {order.price}
              </span>
              <span className={`${styles.other} ${styles[order.side]}`}>
                {new Intl.NumberFormat("ru-RU").format(order.amount)}
              </span>
              <span className={styles.other}>{order.instrument}</span>
            </div>
          );
        })}
    </div>
  );
};
