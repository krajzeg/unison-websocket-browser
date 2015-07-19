"use strict";var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _ = require("lodash");

var DEFAULT_OPTIONS = { 
  debug: false };var 


UnisonWebsocketClient = (function () {
  function UnisonWebsocketClient(websocketUrl) {var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];_classCallCheck(this, UnisonWebsocketClient);
    if (!WebSocket) 
    throw new Error("Your browser does not support websockets.");

    this.options = _.defaults(options, DEFAULT_OPTIONS);
    this.url = websocketUrl;

    this._bufferedMessages = [];

    this.connect();}_createClass(UnisonWebsocketClient, [{ key: "connect", value: 


    function connect() {var _this = this;
      this.ws = new WebSocket(websocketUrl);
      ws.onopen = function () {
        _this.ws = ws;};

      ws.onclose = function () {
        console.log("Websocket connection to " + _this.url + " closed.");};

      ws.onmsesage = function (evt) {_this.receive(evt.data);};} }, { key: "send", value: 


    function send(msgString) {
      ws.send(msgString);} }, { key: "receive", value: 


    function receive(msgString) {
      if (this._receiveCallback) {
        this._receiveCallback(msgString);} else 
      {
        // if the callback is not registered yet, we buffer messages for later
        this._bufferedMessages.push(msgString);}} }, { key: "onReceive", value: 



    function onReceive(callback) {var _this2 = this;
      this._receiveCallback = callback;

      // deliver all buffered messages now that there is somebody listening
      this._bufferedMessages.forEach(function (msg) {
        _this2.receive(msg);});} }]);return UnisonWebsocketClient;})();
//# sourceMappingURL=index.js.map