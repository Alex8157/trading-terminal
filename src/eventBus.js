export class EventBus {
  constructor(ws) {
    this.webSocket = ws;
    this.changeSell = () => {};
    this.changeBuy = () => {};
    this.changeOrder = () => {};
    this.webSocket.addListener((data) => {
      if (data.method === "prices") {
        this.changeSell(data.params.sell);
        this.changeBuy(data.params.buy);
      } else {
        this.changeOrder({
          id: +data.params.id,
          creationTime: data.params.creationTime,
          changeTime: data.params.changeTime,
          status: data.params.status,
          side: data.params.message.type,
          price: +data.params.message.sellPrice,
          amount: +data.params.message.amount,
          instrument: data.params.message.instrument,
        });
      }
    });
  }

  addPriceFuncs(func) {
    this.changeSell = func.sell;
    this.changeBuy = func.buy;
  }

  addOrderFunc(func) {
    this.changeOrder = func;
  }

  send(message) {
    this.webSocket.send(message);
  }
}
