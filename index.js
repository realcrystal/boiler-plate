const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
const dbPassword = '2eHihfYX607rxscV'
mongoose.connect(`mongodb+srv://admin:${dbPassword}@boiler-plate.hvwv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})