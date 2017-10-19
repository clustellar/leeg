module.exports = {
  authenticated: function (app) {
    console.log('USER HAS AUTHENTICATED');
    app.emit('toast', { type: 'is-success', message: 'Signed In!' })
  }
}
