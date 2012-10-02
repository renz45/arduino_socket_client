# Arduino Socket Client

The intention of this application is to connect to a remote api via sockets so information can be sent back and forth to control an arduino on the client end. 

I have built a version of node.js (node_s) which can be run standalone on OSX (tested on lion) so installing node.js is not needed.

You can run the application by executing the bash script app.sh

I used something called platypus to package this client application into a native .app wrapper so you can just open it like a normal application.

If you want to use this on your own you need to go in and change:

```javascript
  var socket = io.connect('http://adamrensel.arduino_socket_client.nodejitsu.com:80');
```

to your own url of the server app. I need to make a better way of configuring the url, I'll probably play around with app.js one of these days to make a configuration menu for the packaged native app.

Check out the other repo on my account: [Arduino_socket_server](https://github.com/renz45/arduino_socket_server) for the companion app which this is supposed to connect to.

# Adding new commands
If your familar with socket.io then this will be a snap.

You can listen for different socket emitters by doing something like:

```javascript

socket.on(<emitter name>, function (data) {
  ... do something here
});

```

You will need to change/create the associated emitters on the server side to match this.