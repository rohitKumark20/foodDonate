const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const router = require('./route/route.js')
const Connection = require('./database/db.js');
const path = require('path');
const { authenticate } = require('./middleware/authenticate.js');
Connection();

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}))


app.use(express.json())

app.use('/', router)
app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*', function(_,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'),function(err){
        res.status(500).send(err);
    })
})

// sendNotification();

app.listen(PORT, () => console.log(`server is running on ${PORT}`))