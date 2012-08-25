var arduino = require('duino'),
    board = new arduino.Board();

var io = require('socket.io-client');
var socket = io.connect('http://localhost:9292');

socket.on('connect_failed', function(){console.log('Connection Failed');});
socket.on('connect', function(){console.log('Connected');});
socket.on('disconnect', function () {console.log('Disconnected');});

socket.on('command', function (data) {
  var led = new arduino.Led({
    board: board,
    pin: data.pin
  });

  if(data.state === 'high') {
    led.on();
    socket.emit('led_state', { led: 'on'});
  }else if(data.state === 'low'){
    led.off();
    socket.emit('led_state', { led: 'on'});
  }
});