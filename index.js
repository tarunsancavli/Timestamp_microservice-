// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const date = req.params.date;
  let date1;
  if(!date) {
    date1 = new Date();
  } else {
    if(!isNaN(date)) {
      date1 = new Date(parseInt(date));
    } else {
      date1 = new Date(date);
    }
  }
  if(date1.toString() === 'Invalid Date') {
    res.json({error : date1.toString()})
  } else {
    res.json({unix: date1.getTime(),utc: date1.toUTCString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
