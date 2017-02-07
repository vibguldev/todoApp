const fileToRead = process.argv[2];
const fs = require('fs');

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => ((err) ? (reject(err)) : resolve(data)))
  })
}


readFile(fileToRead)
  .then((data) => {
    console.log(data.toString())
  })
  .catch(err => {
    console.log(err)
  })

module.exports = readFile;