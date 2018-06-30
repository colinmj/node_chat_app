$(document).ready(function() {
  var socket = io();

  socket.on('connect', function() {
    console.log('Connected to server');
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function(message) {
    console.log('new message', message);
    var li = $('<li></li>');
    li.text(`From: ${message.from} Message: ${message.text}`);

    $('#messages').append(li);
  });

  $('#message-form').on('submit', function(e) {
    e.preventDefault();
    console.log('works');

    socket.emit(
      'createMessage',
      {
        from: 'User',
        text: $('[name=message]').val()
      },
      function() {}
    );
  });
});
