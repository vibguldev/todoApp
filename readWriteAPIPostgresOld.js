let operations = require('./crudUsingPostgres.js')

const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('mention /read after the url to read the file content <br> mention /write after the url to read the file content \n\n ')
})
// app.set('view engine', 'ejs')
app.get('/read', function (req, res) {
  operations.read()
    .then((response) => {
      console.log(response[0])
      res.send(response[0])
    })
    .catch((response) => {
      console.log(response)
    })
})

app.post('/write/:description', function (req, res) {
  let description = req.params['description']
  operations.insert(description)
    .then((response) => {
      console.log(response[0])
      if (response[1].rowCount === 0) {
        res.sendStatus(500)
      }
      res.send('Successfully added')
      // res.redirect('/read')
    })
    .catch((response) => {
      console.log(response)
    })
})

app.delete('/destroy/:id', function (req, res) {
  let id = req.params['id']
  operations.destroy(id)
    .then((response) => {
      console.log(response[0])
      // res.redirect('/read')
      if (response[1].rowCount === 0) {
        res.sendStatus(500)
      }
      else {
      res.send('Successfully deleted')
      }
    })
    .catch((response) => {
      console.log(response)
    })
})

// app.put('/update/:id/:description/:status', function (req, res) {
//   let id = req.params['id']
//   let description = req.params['description']
//   let status = req.params['status']
//   operations.update(id, description, status)
//     .then((response) => {
//       console.log(response[0])
//       res.redirect('/read')
//     })
//     .catch((response) => {
//       console.log(response)
//     })
// })

app.put('/update/:id/', function (req, res) {
  let id = req.params['id']
  let description = req.body['description']
  let status = req.body['status']
  operations.update(id, description, status)
    .then((response) => {
      console.log(response[0])
      if (response[1].rowCount === 0) {
        res.sendStatus(500)
      }
      else {
      res.send('Successfully updated')
      // res.redirect('/read')
      }
    })
    .catch((response) => {
      console.log(response)
    })
})

function formatResponse (response) {
  response.forEach((data) => {
    console.log(data.description)
  })
}



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})