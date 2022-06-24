const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

 // more code will go in here just befor the listening function

app.listen(8000, function () {
    console.log("Listening on port 8000!");
});

app.get("/video", function (req, res) {
    const videoPath = "videos/tucker_test.mp4";
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const range = req.headers.range;
    const start = range ? Number(range.replace(/\D/g, "")) : 0;
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

app.get("/video/:name", function (req, res) {
    if (!req.params.name) {
        res.status(400).send("Requires video name parameter");
    }
    const videoPath = "videos/" + req.params.name;
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const range = req.headers.range;
    const start = range ? Number(range.replace(/\D/g, "")) : 0;
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});