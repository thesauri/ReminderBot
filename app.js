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
  const regex = /(.+?(?=at|in))(\w{2})\s(\d{2}:\d{2})/ //Match some text first at/in 00:00
  const reminder = regex.exec(text)

  if (reminder != null) {
    const timeNow = new Date()
    const timeTimer = new Date(timeNow.getYear(), timeNow.getMonth(), timeNow.getDate(), reminder[3], reminder[4])
    console.log(timeTimer)
    const diff = timeTimer.getTime() - timeNow.getTime()
    const response = {
      method: "sendMessage",
      chat_id: update.message.chat.id,
      text: `Setting reminder ${reminder[1]} ${reminder[2]} ${reminder[3]}, sending in ${diff / 1000 / 60} minutes`
    }

    res.send(response)
  } else {
    res.send("OK")
  }

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
