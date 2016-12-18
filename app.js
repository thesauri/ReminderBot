const express = require("express")
const request = require("request")
const app = express()
const PORT = process.env.PORT || 5000
const TOKEN = process.env.TOKEN

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get(`/${TOKEN}`, (req, res) => {
  console.log(req)
})

app.listen(PORT)
console.log(`Listening on ${PORT}`)

const options = {
  url: `https://api.telegram.org/bot${TOKEN}/setWebhook`,
  headers: {
    "url": `https://bobthereminderbot.herokuapp.com/${TOKEN}`
  }
}

request(options, (error, response, body) => {
  console.log(response)
})
