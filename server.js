//Config support for .env file
const dotenv = require("dotenv");
dotenv.config();

//Import server config
const config = require("./config");
const messages = config.responses.messages;
const errors = config.responses.errors;

//Config mysql
const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

//Connect to mysql database
mysqlConnection.connect(function (err) {
  if (err) {
    console.error("[MYSQL] Error connecting: " + err.stack);
    return;
  }
  console.log("[MYSQL] Connected with thread id: " + mysqlConnection.threadId);
});

const express = require("express");
const path = require("path");
const fs = require("fs");
const cache = require("./cache.js");
var fileUpload = require("express-fileupload");
const app = express();
const hidePoweredBy = require("hide-powered-by");
const validator = require("validator");

//Unique id generator
function genId(length, isFile, ext) {
  var id = "";
  const charset = config.charset; //Characters that can be used to generate ids

  for (var i = 0; i < length; i++)
    id += charset.charAt(Math.floor(Math.random() * charset.length));

  //Check if id is blacklisted
  if (config.blacklistedIds.includes(id)) return genId(length);

  //Checks based on generating id for files or urls
  if (isFile) {
    //Check if file already exists
    fs.exists(
      __dirname + path.sep + "images" + path.sep + id + "." + ext,
      (exists) => {
        if (exists) return genId(length, true, ext);
      }
    );
  } else {
    //Check if id already exists if generating for url shortener
    mysqlConnection.query(
      "SELECT * FROM ids WHERE id = ?",
      [id],
      (err, data, fields) => {
        if (data[0]) {
          if (data[0].code == id) return genId(length);
        }
      }
    );
  }
  return id;
}

function handleGetId(req, res) {
  const id = req.params.id;

  const file = __dirname + path.sep + "images" + path.sep + id;

  fs.exists(file, (exists) => {
    console.log(file, exists);
    if (exists) {
      res.sendFile(file);
    } else {
      mysqlConnection.query(
        "SELECT * FROM ids WHERE id = ?",
        [id],
        (err, result, fields) => {
          if (err == null) {
            if (result[0]) {
              if (result[0].id == id) {
                if (
                  !result[0].url.startsWith("http") &&
                  !result[0].url.startsWith("ftp")
                )
                  res.redirect("http://" + result[0].url);
                else res.redirect(result[0].url);
              } else res.redirect("/404");
            } else res.redirect("/404");
          } else {
            res
              .status(500)
              .json({
                message: messages.unknown_error,
                error: errors.unknown_error,
                success: false,
              });
            console.log(err);
          }
        }
      );
    }
  });
}

function handleUpload(req, res) {
  if (req.files) {
    if (req.files.sharex) {
      const extension = req.files.sharex.name.split(".")[1] || "";

      const id = genId(config.id.length, true, extension);

      if (config.blacklistedExtensions.includes(extension)) {
        return res
          .status(405)
          .send("You cannot upload a file of that extension");
      } else {
        req.files.sharex.mv(
          __dirname + path.sep + "images" + path.sep + id + "." + extension
        );
        res.send("http://" + req.hostname + "/" + id + "." + extension);
      }
    } else {
      res.send("No file named sharex was uploaded.");
    }
  } else {
    res.send("No file uploaded.");
  }
}

function formatURL(host, id) {
  return "https://" + host + "/" + id;
}

app.use(
  fileUpload({
    safeFileNames: false,
    preserveExtension: true,
    limits: {
      fileSize: config.fileSizeLimit,
    },
  })
);

//Use pug
app.set("view engine", "pug");
app.use("/static", express.static(path.join(__dirname + "/public")));

//Hide X-Powered-By
app.use(hidePoweredBy({ setTo: "v8 - Pepsi" }));

app.get("/sharex", (req, res) => {
  let _config = `{
  "Version": "12.4.1",
  "DestinationType": "ImageUploader, TextUploader, FileUploader",
  "RequestMethod": "POST",
  "RequestURL": "http://${req.host}/up.php",
  "Body": "MultipartFormData",
  "FileFormName": "sharex"
  }`;
  res.set("Content-Disposition", "attachment;filename=" + req.host + ".sxcu");
  res.set("Content-Type", "application/octet-stream");
  res.send(_config);
});

app.get("/", (req, res) => {
  res.render("index", {});
});

//Generation testing
app.get("/gen", function (req, res) {
  res.send(genId(config.id.length, false));
});

//Favicon
app.get("/favicon.ico", function (req, res) {
  res.sendFile(__dirname + "/public/favicon.ico");
});

//API docs
app.get("/api/docs", function (req, res) {
  res.send("TODO");
});

//Online domains
app.get("/domains", (req, res) => {
  cache.checkCache((c) => {
    res.render("domains", {
      cache: c,
    });
  });
});

app.get("/assets/styles.css", (req, res) => {
  res.sendFile(__dirname + "/public/style.css");
});

app.get("/ping", (req, res) => {
  res.send("~");
});

app.get("/api/v1/status", (req, res) => {
  cache.checkCache((c) => {
    res.send(c);
  });
});

/*
app.post('/up.php', (req, res) => {
  return handleUpload(req, res);
});
app.post('/upload.php', (req, res) => {
  return handleUpload(req, res);
});
app.post('/up', (req, res) => {
  return handleUpload(req, res);
});
app.post('/upload', (req, res) => {
  return handleUpload(req, res);
});
app.post('/u.php', (req, res) => {
  return handleUpload(req, res);
});
app.post('/u', (req, res) => {
  return handleUpload(req, res);
});
app.post('/i/up.php', (req, res) => {
  return handleUpload(req, res);
});
app.post('/i/upload.php', (req, res) => {
  return handleUpload(req, res);
});
app.post('/i/up', (req, res) => {
  return handleUpload(req, res);
});
app.post('/i/upload', (req, res) => {
  return handleUpload(req, res);
});
app.post('/i/u.php', (req, res) => {
  return handleUpload(req, res);
});
app.post('/i/u', (req, res) => {
  return handleUpload(req, res);
});*/

app.get("/:id", handleGetId);
app.get("/i/:id", handleGetId);

app.all("*", (req, res) => {
  res.render("404", {
    reason: "Page not found. Did you type the URL correctly?",
  });
});

const listener = app.listen(process.env.PORT, process.env.HOST, function () {
  cache.initCache();
  var host = listener.address().address;
  var port = listener.address().port;
  console.log("[FILE.WINE] Launched on port " + listener.address().port);
});
