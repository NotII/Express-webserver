// --------------------------------------------- \\
const express = require("express");
var fs = require("fs");
const app = express();
app.use(express.static("./video"));
// --------------------------------------------- \\
app.get("/", (req, res) => {
  if (req.hostname === "api.shinobu.host") {
    res.send("Localhost");
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
    res.send("403 Not allowed");
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
});
app.listen(80);
