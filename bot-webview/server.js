// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const axios = require('axios');
const crypto = require('crypto');
var ngrok = '3cc6efe4';

var bodyParser = require('body-parser');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/form', function (req, res) {
	var data = req.body; 
  res.send('<a href="/">back</a><p><pre>' + JSON.stringify(data) + '</pre></p>');

});


app.post('/list', function (req, res) {
	var frase = req.body.frase; 
  
  var key = "32451a7db0ec926099305daf8bb169f0";
  // los espacios deben respetarse
  var dictionary = '{"object":"page","entry":[{"id":"1049331001918733","time":1553890462357,"messaging":[{"sender":{"id":"1947064088740880"},"recipient":{"id":"1944287389018192"},"timestamp":1553890402878,"message":{"mid":"YrgOwMGrkZN7elHQmWD4PjuXmlD3JXD27qjczav7zUSw8FUgKo2mzMLoU9_ohvMFMbSuv4fBuMwwSvoN9z6fhA","seq":165395,"text":"'+ frase+'"}}]}]}';

  var ha = crypto.createHmac('sha1',key).update(dictionary).digest('hex')

  var signature = 'sha1='+ha;
  var host ="https://"+ngrok+".ngrok.io";
  var pat = "/webhooks/facebook/webhook?access_token=EAAboUa8p6FABALpIjZAYNCQ9r4dk3lwv6DvhOV59IZB7whGMDy1ymRpNNxJA5A4qVStJSkBstk5ih4ZBHZBQqnculdsmRkOETZBqMRXUN8sVD7yOZALp5BW4pSZCQ5tXlOX5LuRkdOMnbFrJuGcafyKTurrZCke3vId4zJFhzqfdigZDZD";
  var url = host+pat;
  var data = {"object":"page","entry":
            [{"id":"1049331001918733",
              "time":1553890462357,
              "messaging":[{"sender":{"id":"1947064088740880"},
                            "recipient":{"id":"1944287389018192"},
                            "timestamp":1553890402878,
                            "message":{"mid":"YrgOwMGrkZN7elHQmWD4PjuXmlD3JXD27qjczav7zUSw8FUgKo2mzMLoU9_ohvMFMbSuv4fBuMwwSvoN9z6fhA",
                                       "seq":165395,"text":frase}}]}]};

  var dd = JSON.stringify(data);
  var headers = {
      'Content-Type': 'application/json',
      'X-Hub-Signature': signature
    }
  axios.post(url, dd, {headers: headers}).then(function (response) {console.log('response');}).catch(function (error) { console.log('error'); });



  res.send(ha);
});



app.get('/input', (request, response) => {
  response.sendFile(__dirname + '/views/input.html');
});

app.get('/picker', (request, response) => {
  response.sendFile(__dirname + '/views/picker.html');
});


// envia los datos
app.post('/picker', function (req, res) {
	var frase = req.body.frase; 
  
  var key = "32451a7db0ec926099305daf8bb169f0";
  // los espacios deben respetarse
  var dictionary = '{"object":"page","entry":[{"id":"1049331001918733","time":1553890462357,"messaging":[{"sender":{"id":"1947064088740880"},"recipient":{"id":"1944287389018192"},"timestamp":1553890402878,"message":{"mid":"YrgOwMGrkZN7elHQmWD4PjuXmlD3JXD27qjczav7zUSw8FUgKo2mzMLoU9_ohvMFMbSuv4fBuMwwSvoN9z6fhA","seq":165395,"text":"'+ frase+'"}}]}]}';

  var ha = crypto.createHmac('sha1',key).update(dictionary).digest('hex')

  var signature = 'sha1='+ha;
  
  var host ="https://"+ngrok+".ngrok.io";
  var pat = "/webhooks/facebook/webhook?access_token=EAAboUa8p6FABALpIjZAYNCQ9r4dk3lwv6DvhOV59IZB7whGMDy1ymRpNNxJA5A4qVStJSkBstk5ih4ZBHZBQqnculdsmRkOETZBqMRXUN8sVD7yOZALp5BW4pSZCQ5tXlOX5LuRkdOMnbFrJuGcafyKTurrZCke3vId4zJFhzqfdigZDZD";
  var url = host+pat;
  var data = {"object":"page","entry":
            [{"id":"1049331001918733",
              "time":1553890462357,
              "messaging":[{"sender":{"id":"1947064088740880"},
                            "recipient":{"id":"1944287389018192"},
                            "timestamp":1553890402878,
                            "message":{"mid":"YrgOwMGrkZN7elHQmWD4PjuXmlD3JXD27qjczav7zUSw8FUgKo2mzMLoU9_ohvMFMbSuv4fBuMwwSvoN9z6fhA",
                                       "seq":165395,"text":frase}}]}]};

  var dd = JSON.stringify(data);
  var headers = {
      'Content-Type': 'application/json',
      'X-Hub-Signature': signature
    }
  axios.post(url, dd, {headers: headers}).then(function (response) {console.log('response');}).catch(function (error) { console.log('error'); });



  res.send(ha);
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
