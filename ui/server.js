import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;
const PUBLIC_DIR = path.join(__dirname, "public");

const CONTENT_TYPE_MAP = {
  HTML: "text/html",
  JS: "application/javascript",
  DEFAULT: "text/plain",
};

const server = http.createServer((req, res) => {
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = path.join(PUBLIC_DIR, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(filePath);
    const contentType =
      CONTENT_TYPE_MAP[ext.substring(1).toUpperCase()] ||
      CONTENT_TYPE_MAP.DEFAULT;

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
