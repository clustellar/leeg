var Primus = require('primus')
//  , Substream = require('substream')
  , PrimusEmit = require('primus-emit')
;

module.exports = function (server, opts) {
  var primus = new Primus(server, { transformer: 'uws' });

  primus.plugin('emit', PrimusEmit);
//  primus.plugin('substream', Substream);

  primus.on('connection', function (spark) {
    console.log('CLIENT CONNECTED: ');
    spark.write('Client Connected!');

    spark.emit('toast', 'toast from spark');

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
