import { Router } from "express";
import path from "path";
import fs from "fs";

const audioRouter = Router();

audioRouter.get("/:path", (req, res) => {
  const audioPath = path.join(__dirname, `../public/${req.params.path}`);
  const stat = fs.statSync(audioPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace("bytes=", "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    if (start >= fileSize) {
      res
        .status(416)
        .send("Requested range not satisfiable\n" + start + ">=" + fileSize);
      return;
    }
    const chunksize = end - start + 1;
    const file = fs.createReadStream(audioPath, { start, end });
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
    fs.createReadStream(audioPath).pipe(res);
  }
});

export default audioRouter;
