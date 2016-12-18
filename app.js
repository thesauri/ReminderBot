const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const app = express()
const PORT = process.env.PORT || 5000
const TOKEN = process.env.TOKEN

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send('Hello World')
})

//Webhook
app.post(`/${TOKEN}`, (req, res) => {
  const update = req.body
  const text = update.message.text

  const response = {
    method: "sendMessage",
    chat_id: update.message.chat.id,
    text: "Hej!"
  }

  res.send(response)
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
  console.log(body)
})
