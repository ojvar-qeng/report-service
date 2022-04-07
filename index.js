const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const App = express();
const morgan = require("morgan");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("reports"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

/* Read .env file */
dotenv.config();

/* Preparation */
App.use(express.urlencoded({ extended: false }));
App.use(express.json());
App.use(morgan("combined"));

/* Define routes */
App.post("/report/upload", upload.single("file"), (req, res, next) => {
  const { originalname, mimetype } = req.file;
  res.send({ originalname, mimetype });
});
App.post("/report/:name", (req, res, next) => {
  const reports = require("./helpers");
  reports.ReportHelper.generate(req.params.name, req.body)
    .then((stream) => {
      res
        .attachment(req.params.name + ".pdf")
        .type("text/pdf")
        .send(stream)
        .end();
    })
    .catch((err) => {
      console.log(err);
      res.send(500).end();
    });
});
App.use((req, res, next) => {
  res.send("We guess you are lost, :))))");
});

/* Start listening */
const PORT = process.env.PORT || 3010;
const HOST = process.env.HOST || "127.0.0.1";
App.listen(PORT, HOST, console.log(`Server is running on ${HOST}:${PORT}`));
