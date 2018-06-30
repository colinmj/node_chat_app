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

  socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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

  // location send
  var locationButton = $('#send-location');
  locationButton.on('click', function() {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported');
    }
    navigator.geolocation.getCurrentPosition(
      function(position) {
        console.log(position);
        socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      function() {
        alert('Unable to fetch location');
      }
    );
  });
});
