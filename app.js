// --------------------------------------------- \\
var fileUpload = require("express-fileupload");
const path = require("path");
const hidePoweredBy = require("hide-powered-by");
const validator = require("validator");
const express = require("express");
const app = express();
app.use(hidePoweredBy({ setTo: "Pepsi Webserver v1" }));
const owofy = require("owofy");
const responseTime = require("response-time");
var cloudflare = require('cloudflare-express');
app.use(cloudflare.restore());
app.use(responseTime());
var fs = require("fs");
var request = require("request");
const config = require("./config");
const messages = config.responses.messages;
app.use(express.static("./actions"));
var sharex = [
    "66.11.123.46",
    "rape.horse",
    "rape.works",
    "nibba.wtf",
    "anal-rape.me",
    "allah-ak.bar",
    "banned-from-discord.club",
    "criminals.fr",
    "depressive.club",
    "niggers.design",
    "nigger.vision",
    "rape.ovh",
    "send-nud.es",
    "thicc-bit.ch",
    "wristsl.it",
    "wrist-slit.fun",
];
var ext = ["css", "png", "jpg", "txt", "webp"];
var path1 = "/root/test/images";
// --------------------------------------------- \\
// Main
app.get("/auth/selfbot", (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.send("405 Not allowed");
    } else {
        var whitelist = fs.readFile("whitelist.txt", { encoding: "utf-8"}, function (err, data) {
            if(data.includes(req.query.hwid)){
                res.send("authenticated")
            } else {
                res.send("hwid not in database")
            }
        })
    }
})

app.get("/", (req, res) => {
    if(req.hostname === "rape.ovh"){
        var file = fs.readFile("mexydox.txt", {encoding: "utf-8"}, function (err, data) {
            res.send(data)
        })
    } else {
        if (req.hostname === "api.shinobu.host") {
            console.log(req.connection.remoteAddress);
            res.send("Shinobu - API");
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
    if (req.query.warning === "nsfw") {
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
    if (req.query.music === "russia") {
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
    if(req.query.music === "mexydox"){
        const path = "./music/earrape.mp3";
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
        if (Object.keys(req.query.song).length === 0) {
            res.send("405 Not allowed");
        } else {
            request(
                `https://lyrics-api.powercord.dev/lyrics?input=${req.query.song}`,
                function (error, response, body) {
                    var obj = JSON.parse(body);
                    if (!obj.data[0]) {
                        return res.send("Unable to find lyrics");
                    }
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
        }
    } else {
        res.send("405 Not Allowed");
    }
});
//
// ShareX
app.use(
    fileUpload({
        safeFileNames: false,
        preserveExtension: true,
        limits: { fileSize: config.fileSizeLimit },
    })
);
app.get("/sharex", (req, res) => {
    let _config = `{
  "Version": "12.4.1",
  "DestinationType": "ImageUploader, TextUploader, FileUploader",
  "RequestMethod": "POST",
  "RequestURL": "http://${req.hostname}/up.php",
  "Body": "MultipartFormData",
  "FileFormName": "sharex"
  }`;
    res.set(
        "Content-Disposition",
        "attachment;filename=" + req.hostname + ".sxcu"
    );
    res.set("Content-Type", "application/octet-stream");
    res.send(_config);
});
// HandleUpload
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
                fs.mkdir(`${__dirname}/images/${id}`, (err) => {
                    if (err) {
                        throw err;
                    }
                    req.files.sharex.mv(
                        __dirname +
                        path.sep +
                        "images" +
                        path.sep +
                        id +
                        path.sep +
                        "raw" +
                        "." +
                        extension
                    );
                });
                res.send("https://" + req.hostname + "/" + id);
                fs.appendFileSync("log.txt", `File: ${id} - Uploader: ${req.cf_ip}\n`)
            }
        } else {
            res.send("No file named sharex was uploaded.");
        }
    } else {
        res.send("No file uploaded.");
    }
}
// GenID
function genId(length, isFile, ext) {
    var id = "";
    const charset = config.charset;

    for (var i = 0; i < length; i++)
        id += charset.charAt(Math.floor(Math.random() * charset.length));

    if (config.blacklistedIds.includes(id)) return genId(length);

    if (isFile) {
        // fs.exists(
        //   __dirname + path.sep + "images" + path.sep + id + path.sep + "raw" + "." + ext,
        // (exists) => {
        //   if (exists) return genId(length, true, ext);
        // }
        // );
    } else {
    }
    return id;
}
// Handle Getting Images
app.get("/:image", (req, res) => {
    for (var i of sharex) {
        if (req.hostname === i) {
            var file = fs.readFile("./image.html", { encoding: "utf-8" }, function (
                err,
                data
            ) {
                let newdata = data.replace(
                    "img",
                    `<img src="http://${req.hostname}/i/${req.params.image}" style="border:0px #000000 none;" name="main" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" autoplay="" allowfullscreen="">`
                );
                let newdata1 = newdata.replace("domain", `${req.hostname}`);
                let newdata2 = newdata1.replace(
                    "meta",
                    `<meta property="og:title" content="https://${req.hostname} | Provided by NotII">\n<meta property="twitter:card" content="summary_large_image">\n<meta name="theme-color" content="#8b01fc">\n <meta property="og:description" content="now partnered with niger.bet.">
\n<meta property="og:url" content="http://${req.hostname}/${req.params.image}"\n<meta property="og:image" content="http://${req.hostname}/i/${req.params.image}">\n<meta property="og:image:url" content="http://${req.hostname}/i/${req.params.image}"\n<meta property="og:image:type" content="image/png">`
                );
                res.send(newdata2);
            });
        }
    }
});
app.get("/i/:img", (req, res) => {
    var direc = `${__dirname}/images/${req.params.img}`;
    if (fs.existsSync(direc)) {
        for (var i of ext) {
            if (fs.existsSync(`${__dirname}/images/${req.params.img}/raw.${i}`)) {
                fs.readFile(`${__dirname}/images/${req.params.img}/raw.${i}`, function (
                    err,
                    data
                ) {
                    res.write(data);
                    return res.end();
                });
            }
        }
    } else {
        res.send("404 Not Found");
    }
});
// Handle Uploading
app.post("/up.php", (req, res) => {
    return handleUpload(req, res);
});
app.post("/upload.php", (req, res) => {
    return handleUpload(req, res);
});
app.post("/up", (req, res) => {
    return handleUpload(req, res);
});
app.post("/upload", (req, res) => {
    return handleUpload(req, res);
});
app.post("/u.php", (req, res) => {
    return handleUpload(req, res);
});
app.post("/u", (req, res) => {
    return handleUpload(req, res);
});
app.post("/i/up.php", (req, res) => {
    return handleUpload(req, res);
});
app.post("/i/upload.php", (req, res) => {
    return handleUpload(req, res);
});
app.post("/i/up", (req, res) => {
    return handleUpload(req, res);
});
app.post("/i/upload", (req, res) => {
    return handleUpload(req, res);
});
app.post("/i/u.php", (req, res) => {
    return handleUpload(req, res);
});
app.post("/i/u", (req, res) => {
    return handleUpload(req, res);
});
app.listen(80, '138.201.143.202');
const https = require("https");
https.createServer(app).listen(443);