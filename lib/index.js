var _ = require('lodash');

const DEFAULT_OPTIONS = {
  debug: false
};

class UnisonWebsocketClient {
  constructor(websocketUrl, options = {}) {
    if (!WebSocket)
      throw new Error("Your browser does not support websockets.");

    this.options = _.defaults(options, DEFAULT_OPTIONS);
    this.url = websocketUrl;

    this._bufferedMessages = [];

    this.connect();
  }

  connect() {
    this.ws = new WebSocket(websocketUrl);
    ws.onopen = () => {
      this.ws = ws;
    };
    ws.onclose = () => {
      console.log(`Websocket connection to ${this.url} closed.`);
    };
    ws.onmsesage = (evt) => { this.receive(evt.data) };
  }

  send(msgString) {
    ws.send(msgString);
  }

  receive(msgString) {
    if (this._receiveCallback) {
      this._receiveCallback(msgString);
    } else {
      // if the callback is not registered yet, we buffer messages for later
      this._bufferedMessages.push(msgString);
    }
  }

  onReceive(callback) {
    this._receiveCallback = callback;

    // deliver all buffered messages now that there is somebody listening
    this._bufferedMessages.forEach((msg) => {
      this.receive(msg);
    });
  }
}
