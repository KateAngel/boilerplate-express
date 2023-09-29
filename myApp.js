require('dotenv').config()
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next()
});

console.log('Hello World!');
app.get('/', function (req, res) {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

app.use("/public", express.static(__dirname + "/public"));

app.get('/json', function (req, res) {
    if (process.env.MESSAGE_STYLE==="uppercase") {
        res.json({"message": "HELLO JSON"})
    } else {
        res.json({"message": "Hello json"})
    }
})

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.send({time: req.time})
});

app.get("/:word/echo", function(req, res) {
    const { word } = req.params;
    res.json({
    echo: word
    });
})

app.route("/name").get( (req, res) => { 
    var firstName = req.query.first;
    var lastName = req.query.last;
    res.json({ 
        name: `${firstName} ${lastName}`
    });
}).post( (req, res) => { 
    var firstName = req.body.first;
    var lastName = req.body.last;
    res.json({ 
        name: `${firstName} ${lastName}`
    });
});


























 module.exports = app;
