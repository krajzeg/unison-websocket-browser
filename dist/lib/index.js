"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _ = require('lodash');

var DEFAULT_OPTIONS = { 
  debug: false };var 


UnisonWebsocketClient = (function () {
  function UnisonWebsocketClient(websocketUrl) {var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];_classCallCheck(this, UnisonWebsocketClient);
    if (!WebSocket) 
    throw new Error("Your browser does not support websockets.");

    this.options = _.defaults(options, DEFAULT_OPTIONS);
    this.url = websocketUrl;

    this._bufferedReceives = [];
    this._bufferedSends = [];

    this.connect();}_createClass(UnisonWebsocketClient, [{ key: "connect", value: 


    function connect() {var _this = this;
      var ws = this.ws = new WebSocket(this.url);
      ws.onopen = function () {return _this.sendBufferedMessages();};
      ws.onclose = function () {
        console.log("Websocket connection to " + _this.url + " closed.");};

      ws.onmessage = function (evt) {_this.receive(evt.data);};} }, { key: "send", value: 


    function send(msgString) {
      if (this.ws.readyState < WebSocket.OPEN) {
        if (this.options.debug) console.log("[UNISON] Buffering a send: " + msgString + ".");
        this._bufferedSends.push(msgString);} else 
      {
        if (this.options.debug) console.log("[UNISON] Sending: " + msgString + ".");
        this.ws.send(msgString);}} }, { key: "sendBufferedMessages", value: 



    function sendBufferedMessages() {var _this2 = this;
      this._bufferedSends.forEach(function (msg) {return _this2.send(msg);});
      this._bufferedSends = [];} }, { key: "receive", value: 


    function receive(msgString) {
      if (this.options.debug) console.log("[UNISON] Received: " + msgString + ".");

      if (this._receiveCallback) {
        this._receiveCallback(msgString);} else 
      {
        // if the callback is not registered yet, we buffer messages for later
        if (this.options.debug) console.log("[UNISON] Stashing received message, no callback registered.");
        this._bufferedReceives.push(msgString);}} }, { key: "onReceive", value: 



    function onReceive(callback) {var _this3 = this;
      this._receiveCallback = callback;

      // deliver all buffered messages now that there is somebody listening
      this._bufferedReceives.forEach(function (msg) {
        _this3.receive(msg);});} }]);return UnisonWebsocketClient;})();exports["default"] = UnisonWebsocketClient;module.exports = exports["default"];
//# sourceMappingURL=index.js.map