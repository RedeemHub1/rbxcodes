const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT || 3000);
const root = path.join(__dirname, "preview");

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url || "/", `http://localhost:${port}`);
  let filePath = path.join(root, url.pathname === "/" ? "index.html" : url.pathname);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "content-type": mime[path.extname(filePath)] || "application/octet-stream",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY"
    });
    response.end(data);
  });
});

server.listen(port, () => {
  console.log(`Preview running at http://localhost:${port}`);
});
