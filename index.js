// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  const dateObj = new Date()
  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  })
})

app.get('/api/:date', (req, res) => {
  let date = req.params.date
  let dateObj = new Date(date);
  if (!date.includes('-')) {
    dateObj = new Date(parseInt(date))
  }
  if (isNaN(dateObj.getTime())) {
    res.json({ error: 'Invalid Date' });
  } else if (date.includes('-')) {
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    });
  } else {
    res.json({
      unix: parseInt(date),
      utc: dateObj.toUTCString()
    })
  }
})

app.get('/apa/:unix', (req, res) => {
  const unix = req.params.unix
  const dateObj = new Date(unix)
  res.json({
    unix: unix,
    utc: dateObj.toUTCString()
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
