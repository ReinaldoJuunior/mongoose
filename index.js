const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const mongo =  process.env.MONGODB || 'mongodb://localhost:27017/minhas-series'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// process request body
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

// View Engine EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// test request body
app.get('/',(req, res) => res.render('index.ejs'))

// MongoDB connect
mongoose
   .connect(mongo)
   .then(() => {
     app.listen(port, () => {
        console.log('Listening on: ' + port)
    })
})
.catch(e => {
    console.log(e)
})