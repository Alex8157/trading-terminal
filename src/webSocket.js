export class WS {
  constructor() {
    this.socket = new WebSocket(
      "wss://trading-server.run-eu-central1.goorm.site"
    );
  }

  send(message) {
    this.socket.send(
      JSON.stringify({
        jsonrpc: "2.0",
        method: "transaction",
        params: { message },
      })
    );
  }

  addListener(func) {
    this.socket.addEventListener("message", ({ data }) => {
      func(JSON.parse(data));
    });
  }
}
