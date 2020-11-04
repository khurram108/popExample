let express = require("express")
let expSession = require("express-session")
let cors = require("cors")
let bodyParser = require("body-parser")
let app = express()
let path = require("path")

let PORT = process.env.PORT || 5656;
require("./config/db")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.get('/', (req, res) => {
    res.send("Welcome To Home Page Server is running " + PORT)
})


app.use("/routes", require("./routes/auth"))
app.use("/routes", require("./routes/website")) 
app.use("/routes", require("./routes/cashout"))
app.use("/routes", require("./routes/deshboard")) 
app.use("/routes", require("./routes/referral"))  


app.use(express.static('./build'))

app.use('*', (req, res) => {

    res.sendFile('index.html',{root: './build/'});

});

app.listen(PORT, () => {
    console.log("Server is running at " + PORT);
})
