var arduino = require('duino'),
    board = new arduino.Board();

var io = require('socket.io-client');
var socket = io.connect('http://renz45.arduino_socket_client.nodejitsu.com:80');

socket.on('connect_failed', function(error){
  console.log('Connection Failed');
});
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

socket.on('all_on', function (data) {
  if(data) {
    console.log('TURN THEM ALL ON');
    for(var i = 0; i <= 13; i++) {
      new arduino.Led({board: board,pin: i}).on();
    }
  }else{
    console.log('TURN THEM ALL OFF');
    for(var i = 0; i <= 13; i++) {
      new arduino.Led({board: board,pin: i}).off();
    }
  }
});