const express = require("express")
const request = require("request")
const app = express()
const PORT = process.env.PORT || 5000
const TOKEN = process.env.TOKEN

app.get('/', function (req, res) {
  res.send('Hello World')
})

//Webhook
app.post(`/${TOKEN}`, (req, res) => {
  console.log(req)
  res.send("OK")
})

app.listen(PORT)
console.log(`Listening on ${PORT}`)

//Set up the webhook
const options = {
  url: `https://api.telegram.org/bot${TOKEN}/setWebhook`,
  qs: {
    url: `https://bobthereminderbot.herokuapp.com/${TOKEN}`
  }
}

request(options, (error, response, body) => {
  console.log(response)
})
