export default function (bin) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader()

    reader.onloadend = function () {
      resolve(reader.result)
    }

    reader.onerror = reject

    reader.readAsDataURL(bin)
  })
}
