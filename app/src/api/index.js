var Primus = window.Primus
var primus = null

export default function (url) {
  console.log('URL: ', url)
  primus = primus || Primus('ws://localhost:3030')
  window.primus = primus

  primus.news = primus.substream('news')

  primus.news.on('toast', function (data) {
    console.log('TOAST RECV: ', data)
  })

  primus.on('toast', function (data) {
    console.log('base toast', data)
  })

  primus.news.on('data', function (data) {
    console.log('CLIENT RECV NEWS: ', data)
    primus.news.write('I got your news!')
  })

  return primus
}
