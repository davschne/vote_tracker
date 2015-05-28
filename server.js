var express = require("express");
var app = express();
app.use(express.static("public"));
app.listen(5000, function() {
  console.log("Server running on port 5000...");
});

app.get("/", function(req, res) {
  res.status(200).sendFile("/public/index.html");
});

app.get("/secret", function(req, res) {
  res.status(200).send("<h1>Bruce Willis' character was dead THE WHOLE TIME!</h1>");
});

app.use(function(req, res) {
  res.status(404).send("<h1>404: Not found</h1>");
});
