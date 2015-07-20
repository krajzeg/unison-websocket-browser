# unison-websocket-browser

In-browser websocket communication module for the [Unison][unison] library. Requires a working WebSocket implementation in the browser. Can be used with browserify (using npm for fetching the package) or as a global module (using bower).

# Usage

To set up a Unison client using this communication protocol, you have to do these three steps:

```
// get a UnisonWebSocketClient
<script src="bower_components/unison-websocket-browser/dist/browser.js> // using a global
var UnisonWebSocketClient = require('unison-websocket-browser');        // using browserify

// start Unison using the client
unison({your: state})
    .plugin(client({
        communication: new UnisonWebSocketClient('ws://a.server.somewhere:1234'),
        ...
    });
```

[unison]: https://github.com/krajzeg/unison
