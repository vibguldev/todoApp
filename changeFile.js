const fs = require('fs')
module.exports = function changeFile (file, lineNumber) {
  var dataArray
  fs.readFile(file, (err, data) => {
    if (err) return (`File Not found :  ${err}`)
    else {
      const StringifiedContents = data.toString()
      dataArray = StringifiedContents.split('\n')
      const numberOfLines = dataArray.length
      if (lineNumber > (numberOfLines - 1)) {
        res.send('Error 500 : server issues')
      } else {
        dataArray[Number(lineNumber)] = req.body.data
        dataArray = dataArray.join('\n')
      }
    }
  })
  return dataArray
}
