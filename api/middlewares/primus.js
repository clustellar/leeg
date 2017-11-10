var Primus = require('primus')
//  , Substream = require('substream')
  , PrimusEmit = require('primus-emit')
  , User = require('../models/user')
  , thinky = require('../models/rdb')
;

module.exports = function (server, opts) {
  var primus = new Primus(server, opts);

  primus.plugin('emit', PrimusEmit);
//  primus.plugin('substream', Substream);

  primus.on('connection', function (spark) {
    console.log('CLIENT CONNECTED: ');
    spark.write('Client Connected!');

    thinky.dbReady().then(function () {
      User.changes().then(function(feed) {
        spark.emit('user:feed', feed);
        
        feed.each(function (err, doc) {
          if (err) {
            spark.emit('toast', { type: 'is-danger', message: err.toString() })
          } else if (doc.isSaved() === false) {
            spark.emit('toast', { type: 'is-warning', message: 'User' + + ' was deleted.' })
          } else if (doc.getOldValue() == null) {
            spark.emit('toast', { type: 'is-success', message: doc.displayName + ' has logged in for the first time!' })
          } else {
            spark.emit('toast', { type: 'is-success', message: doc.displayName + ' has been updated' })
          }
        })
      }).error(function(err) {
        console.log('USER CHANGE FEED ERRROR: ', err);
      });
    })

    spark.emit('toast', { type: 'is-success', message: 'You are now connected!' });

    spark.on('user:me', function () {
      console.log('GETTING ME: ');
      spark.emit('user:me');
    })

    // var news = spark.substream('news');
    // var user = spark.substream('user');

    // news.on('data', function (data) {
    //   console.log('NEWS: ', data);
    // })

    // news.write('Hello everyone, a new user has connected!');
  });
  
  return primus;
}
