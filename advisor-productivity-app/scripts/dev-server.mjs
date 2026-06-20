import http from "node:http";
import worker from "../worker/index.js";

const port = Number(process.env.PORT || 4173);

const server = http.createServer(async (req, res) => {
  const url = "http://localhost:" + port + (req.url || "/");
  const response = await worker.fetch(new Request(url), {}, {});
  res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
  res.end(await response.text());
});

server.listen(port, () => {
  console.log("AdvisorOS preview running at http://localhost:" + port);
});
