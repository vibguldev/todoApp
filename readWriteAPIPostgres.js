let operations = require('./crudUsingPostgres.js')

const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
let array
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.get('/', function (req, res) {
  res.render('./public/index.html')
})
// app.set('view engine', 'ejs')
app.get('/read', function (req, res) {
  operations.read()
    .then((response) => {
      // console.log(response[0])
      // array = resolve(response[0])
      // console.log(response)
      res.send(response[0])
    })
    .catch((response) => {
      res.sendStatus('500')
    })
})

app.post('/write/:description', function (req, res) {
  console.log(array)
  let description = req.params['description']
  // console.log(description)
  operations.insert(description)
    .then((response) => {
      // console.log(response)
      // res.redirect('/read')
    })
    .catch((response) => {
      console.log(response)
    })
})

app.delete('/destroy/:id', function (req, res) {
  // let idByUser = (req.params['id'] - 1).toString()
  let idOfDB = req.params['id']
  // resolve(id)
  operations.destroy(idOfDB)
    .then((response) => {
      console.log(response[0])
      // res.redirect('/read')
    })
    .catch((response) => {
      console.log(response)
    })
})

app.put('/update/:id', function (req, res) {
  // let idByUser = (req.params['id'] - 1).toString()
  let idOfDB = req.params['id']
  let description = req.body['description']
  let status = req.body['status']
  // console.log(req.body)
  // console.log(typeof description)
  // console.log(status)
  operations.update(idOfDB, description, status)
    .then((response) => {
      // console.log("correct")
      // console.log(response)
      res.redirect('/read')
    })
    .catch((response) => {
      // console.log("!!!!!!!!!!error!!!!!!!!!!!!!>>>>>>>>>>>>>>>>>")
      console.log(response)
    })
})

// function formatResponse (response) {

// }

function resolve (response) {
  // response.forEach((data) => {
  //   console.log(data.id)
  // })
  return response.map((data) => {
    return data.id
  })
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
