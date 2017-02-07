const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
// const filePath = '/Users/vibhugulati/Desktop/'
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('mention /read after the url to read the file content <br> mention /write after the url to read the file content \n\n ')
})
app.set('view engine', 'ejs')
app.get('/read', function (req, res) {
  fs.readFile(process.argv[2], (err, data) => {
    if (err) console.log(`File Not found :  ${err}`)
    else {
      const StringifiedContents = data.toString()
      const dataToSend = StringifiedContents.split('\n')
      // res.sendFile(StringifiedContents)
      res.render('pages/index', {
        dataToSend: dataToSend
      })
    }
  })
})

// app.param('stringToAppend', function (req, res, next, stringToAppend) {
//   // console.log('param1')
//   fs.readFile(process.argv[2], (err, data) => {
//     if (err) return (`File Not found :  ${err}`)
//     else {
//       const StringifiedContents = data.toString()
//       const splittedConetnt = StringifiedContents.split('\n')
//       splittedConetnt = splittedConetnt.toString().replace(/,/g, '\n')

//       const readData = splittedConetnt.toString().replace(/,/g, '\n') + '<br>'+ stringToAppend
// fs.writeFile(process.argv[2], readData, function (err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('The file was saved!')
//     res.send(readData)
//   }
// })
//     }
//   })
//   next()
// })

app.post('/write', function (req, res) {
  var textToAppend = req.body.appendText
  const data = '\n' + JSON.stringify(textToAppend)  
  fs.appendFile(process.argv[2], data, function (error) {
    if (error) throw error
    res.end('done')
  })
  res.redirect('/read')
})
// use replaceinfile module in node

app.post('/update', function (req, res) {
  fs.readFile(process.argv[2], (err, data) => {
    if (err) res.send(`File Not found :  ${err}`)
    else {
      const StringifiedContents = data.toString()
      var dataArray = StringifiedContents.split('\n')
      const numberOfLines = dataArray.length
      const lineNumber = req.body.lineToModify
      if (lineNumber > (numberOfLines - 1)) {
        res.send('Error 500 : server issues')
      } else {
        dataArray[Number(lineNumber)] = req.body.modifyText
        dataArray = dataArray.join('\n')
        fs.writeFile(process.argv[2], dataArray, function (err) {
          if (err) {
            res.send(err)
          } else {
            console.log('The file was saved!')
            // res.send('The file was updated')
            res.redirect('/read')
          }
        })
      }
    }
  })
})

app.post('/destroy', function (req, res) {
  fs.readFile(process.argv[2], (err, data) => {
    if (err) res.send(`File Not found :  ${err}`)
    else {
      const StringifiedContents = data.toString()
      var dataArray = StringifiedContents.split('\n')
      const numberOfLines = dataArray.length - 1
      const lineNumber = Number(req.body.lineToDelete)
      if (lineNumber > (numberOfLines)) {
        res.sendStatus('500')
      }
      else {
        // var index = lineNumber
        // while (index < numberOfLines) {
        //   dataArray[index] = dataArray[index + 1]
        //   index = index + 1
        dataArray.splice(lineNumber,1)
        }
        
        dataArray = dataArray.join('\n')
        fs.writeFile(process.argv[2], dataArray, function (err) {
          if (err) {
            res.send(err)
          } else {
            console.log('The line was deleted!')
            // res.send('The line was deleted')
            res.redirect('/read')
          }
        })
      }
  })
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
