import worker from "../worker/index.js";

export default async function handler(req, res) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  const url = `${protocol}://${host}${req.url}`;

  const body =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : req;

  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body,
    duplex: "half"
  });

  const response = await worker.fetch(request, {}, {});

  res.status(response.status);

  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const text = await response.text();
  res.send(text);
}