// --------------------------------------------- \\
var fileUpload = require("express-fileupload");
const path = require("path");
const hidePoweredBy = require("hide-powered-by");
const validator = require("validator");
const express = require("express");
const app = express();
const owofy = require("owofy");
const responseTime = require("response-time");
app.use(responseTime());
var fs = require("fs");
var request = require("request");
app.use(express.static("./actions"));
// --------------------------------------------- \\
app.get("/", (req, res) => {
  if (req.hostname === "api.shinobu.host") {
    res.send("Shinobu");
  } else {
    var file = fs.readFile(
      "./rape.horse.html",
      { encoding: "utf-8" },
      function (err, data) {
        let newdata = data.replace("domain", req.hostname);
        let newdata1 = newdata.replace("domain,", `${req.hostname}`);
        res.send(newdata1);
      }
    );
  }
});
app.get("/v1/sites", (req, res) => {
  if (Object.keys(req.query).length === 0) {
    res.send("405 Not allowed");
  } else {
    if (req.query.style === "main") {
      var file = fs.readFile(
        "./styles/main1.prod.01.css",
        { encoding: "utf-8" },
        function (err, data) {
          res.send(data);
        }
      );
    }
  }
  if (req.query.vid === "main") {
    const path = "./video/main.mp4";
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
  if (req.query.music === "main") {
    const path = "./music/main.mp3";
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "audio/mpeg",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "audio/mpeg",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
  if(req.query.warning === "nsfw"){
    const path = "./images/nsfw.gif";
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "audio/mpeg",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "image/gif",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
  if(req.query.music === "russia"){
    const path = "./music/anthem.mp3";
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "audio/mpeg",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "audio/mpeg",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  }
});
app.get("/api/v1/action/:action", (req, res) => {
  if (req.hostname === "api.shinobu.host") {
    var files = fs.readdirSync("actions/" + req.params.action);
    var file = files[Math.floor(Math.random() * files.length)];
    var url =
      `https://media.shinobu.host/actions/` + req.params.action + `/${file}`;
    res.send(`${url}`);
  } else {
    res.send("405 Not Allowed");
  }
});

app.get("/actions/:action/:image", (req, res) => {
  if (req.hostname === "media.shinobu.host") {
    fs.readFile(`./actions/${req.params.action}/${req.params.image}`, function (
      err,
      data
    ) {
      if (err) {
        res.send("404 Not Found");
        return;
      }
      res.write(data);
      return res.end();
    });
  } else {
    res.send("405 Not Allowed");
  }
});
app.get("/api/v1/owofy", (req, res) => {
  if (req.hostname === "api.shinobu.host") {
    res.send(owofy(req.query.text));
  } else {
    res.send("405 Not Allowed");
  }
});
app.get("/api/v1/insult", (req, res) => {
  if (req.hostname === "api.shinobu.host") {
    var insults = require("./insults.json");
    var Insult = Math.floor(Math.random() * insults.length);
    res.send(`${insults[Insult]}`);
  } else {
    res.send("405 Not Allowed");
  }
});
app.get("/api/v1/insult", (req, res) => {
  if (req.hostname === "api.shinobu.host") {
    var insults = require("./insults.json");
    var Insult = Math.floor(Math.random() * insults.length);
    res.send(`${insults[Insult]}`);
  } else {
    res.send("405 Not Allowed");
  }
});
app.get("/api/v1/kill", (req, res) => {
  if (req.hostname === "api.shinobu.host") {
    var kills = require("./kills.json");
    var Kill = Math.floor(Math.random() * kills.length);
    res.send(`${kills[Kill]}`);
  } else {
    res.send("405 Not Allowed");
  }
});
app.get("/api/v1/lyrics", (req, res) => {
  if (req.hostname === "api.shinobu.host") {
    request(
      `https://lyrics-api.powercord.dev/lyrics?input=${req.query.song}`,
      function (error, response, body) {
        var obj = JSON.parse(body);
        res.send(
          `{ "took" : "${obj.took}ms", "artist": "${
            obj.data[0].artist
          }", "name": "${
            obj.data[0].name
          }", "data" : [{ "lyrics": ${JSON.stringify(
            obj.data[0].lyrics
          )} } ], "search_score": "${obj.data[0].search_score}" }`
        );
      }
    );
  } else {
    res.send("405 Not Allowed");
  }
});
function handleUpload(req, res) {
  if (req.files) {
    if (req.files.sharex) {

      const extension = req.files.sharex.name.split('.')[1] || '';

      const id = genId(config.id.length, true, extension);

      if (config.blacklistedExtensions.includes(extension)) {
        return res.status(405).send("You cannot upload a file of that extension");
      } else {
        req.files.sharex.mv(__dirname + path.sep + 'images' + path.sep + id + '.' + extension);
        res.send('http://' + req.hostname + '/' + id + '.' + extension);
      }
    } else {
      res.send("No file named sharex was uploaded.");
    }
  } else {
    res.send("No file uploaded.");
  }
}




app.use(hidePoweredBy({ setTo: "Pepsi" }));

app.listen(80);
const https = require("https");
https.createServer(app).listen(443);
