import express from "express";
import path from "path";
import compression from "compression";

// Use environment defined port or 3001
const port = process.env.PORT || 3001;

// Create express server
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(compression());

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start web server
app.listen(port, error => {
  if (error) {
    console.error("ERROR - Unable to start server."); // eslint-disable-line no-console
  } else {
    console.info(`INFO - Server started on port ${port}.`); // eslint-disable-line no-console
  }
});
