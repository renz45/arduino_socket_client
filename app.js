var arduino = require('duino'),
    board = new arduino.Board();

var io = require('socket.io').listen(9292);

io.sockets.on('connection', function (socket) {

  socket.emit('led_state', { led: 'on'});

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
});