var express = require("express");
var fs = require("fs");
var app = express();

app.use(express.static("public"));
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  console.log("Server running on port " + app.get('port') + "...");
});

var sendOptions = {root: __dirname + "/public/"};

app.get("/", function(req, res) {
  res.status(200).sendFile("index.html", sendOptions);
});

app.get("/secret", function(req, res) {
  var secret = process.env.SECRET;
  console.log(secret);
  res.status(200).send(secret);
});

app.use(function(req, res) {
  res.status(404).sendFile("error.html", sendOptions);
});
