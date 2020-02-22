const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const conn = require('./conn')
const userRoute = require('./routes/userRoute')
const bengkelRoute = require('./routes/bengkelRoute')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : true}))

//middleware 1 connect to db
app.use(function(req, res, next) {
    req.con = conn;
    next()
  })

  //testing get path /tes
app.get('/testapi',(req, res) =>{
    res.send('sukses')
})

//List of image Bengkel
app.use('/img' , express.static('foto-bengkel'))

//Routing api
app.use('/api/user',userRoute)
app.use('/api/bengkel',bengkelRoute)

const server = app.listen(process.env.Port || 3000 , () => {
    console.log(`listening on ip ${server.address().address} and port ${server.address().port}`);
});