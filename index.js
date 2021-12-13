const express = require("express");
const fs = require("fs");
const App = express();
const morgan = require("morgan");

/* Preparation */
App.use(morgan("combined"));

/* Define routes */
App.get("/test", (req, res, next) => {
  const reports = require("./helpers");
  reports.ReportHelper.test()
    .then((stream) => {
      res.attachment("test.pdf").type("text/pdf").send(stream);
    })
    .catch((err) => {
      console.log(err);
      res.send(500);
    });
});
App.use((req, res, next) => {
  res.send("We guess you are lost, :))))");
});

/* Start listening */
const PORT = process.env.PORT || 3010;
const HOST = process.env.HOST || "127.0.0.1";
App.listen(PORT, HOST, console.log(`Server is running on ${HOST}:${PORT}`));
