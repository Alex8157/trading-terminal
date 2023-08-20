export class WS {
  constructor() {
    this.socket = new WebSocket("wss://portfolio-server-f1b6.onrender.com");
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
