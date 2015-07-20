var _ = require('lodash');

const DEFAULT_OPTIONS = {
  debug: false
};

export default class UnisonWebsocketClient {
  constructor(websocketUrl, options = {}) {
    if (!WebSocket)
      throw new Error("Your browser does not support websockets.");

    this.options = _.defaults(options, DEFAULT_OPTIONS);
    this.url = websocketUrl;

    this._bufferedMessages = [];

    this.connect();
  }

  connect() {
    let ws = this.ws = new WebSocket(this.url);
    ws.onclose = () => {
      console.log(`Websocket connection to ${this.url} closed.`);
    };
    ws.onmessage = (evt) => { this.receive(evt.data) };
  }

  send(msgString) {
    if (this.options.debug) console.log(`[UNISON] Sending: ${msgString}.`);
    ws.send(msgString);
  }

  receive(msgString) {
    if (this.options.debug) console.log(`[UNISON] Received: ${msgString}.`);

    if (this._receiveCallback) {
      this._receiveCallback(msgString);
    } else {
      // if the callback is not registered yet, we buffer messages for later
      if (this.options.debug) console.log(`[UNISON] Stashing received message, no callback registered.`);
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
