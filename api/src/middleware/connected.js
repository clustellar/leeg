module.exports = function (io, app) {
  io.on('connection', function (socket) {
    // app.service('messages').create({ text: 'Hello World' }) // insert into database
    setTimeout(function () {
      socket.emit('toast', { type: 'is-success', message: 'You have been connected to the Leeg!' });
    }, 3000)
    setTimeout(function () {
      socket.emit('snackbar', 'If you have any questions, please see help section <strong>here!</strong>');
    }, 6000)
  })
}
