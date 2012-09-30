var pinSwitchDelay = 300;

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
  console.log(data.state);
  if(data.state === 'high') {
    console.log('led on');
    led.on();
    socket.emit('led_state', { led: 'on'});
  }else if(data.state === 'low'){
    console.log('led off');
    led.off();
    socket.emit('led_state', { led: 'on'});
  }
});

delayedLedToggle = function(ledArray, lastLedLit){
  setTimeout(function(){
    ledArray[lastLedLit].on()
    setTimeout(function(){
      ledArray[lastLedLit].off()
      if(ledArray.length - 1 > lastLedLit){
        delayedLedToggle(ledArray, lastLedLit + 1)
      }
    },pinSwitchDelay)
  }, pinSwitchDelay)
}

socket.on('toggle_all', function (data) {
  pins = [0,13,11,10,9,8];

  ledArray = [new arduino.Led({board: board,pin: 13}),
              new arduino.Led({board: board,pin: 11}),
              new arduino.Led({board: board,pin: 10}),
              new arduino.Led({board: board,pin: 9}),
              new arduino.Led({board: board,pin: 8})];

  delayedLedToggle(ledArray, 0)
});