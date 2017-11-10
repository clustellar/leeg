export default function () {
  var Primus = window.Primus
  var primus = Primus(process.env.WEBSOCKET)

  window.primus = primus

  return primus
}
