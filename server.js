var express = require("express");
var app = express();
app.use(express.static("public"));
app.listen(5000, function() {
  console.log("Server running on port 5000...");
});

var sendOptions = {root: "/Users/David/repos/codefellows/vote_tracker/public/"};

app.get("/", function(req, res) {
  res.status(200).sendFile("index.html", sendOptions);
});

app.get("/secret", function(req, res) {
  res.status(200).sendFile("secret.html", sendOptions);
});

app.use(function(req, res) {
  res.status(404).sendFile("error.html", sendOptions);
});
