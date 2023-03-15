const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  /* Check for a subdomain, if it exists, redirect to the apex domain, preserving path */
  const host = req.headers.host;
  const [subdomain, ...apexDomainParts] = host.split(".");
  const apexDomain = apexDomainParts.join(".");

  if (subdomain && apexDomainParts.length > 1) {
    const newUrl = "https://" + apexDomain + req.url;
    res.redirect(301, newUrl);
  } else {
    next();
  }
});

app.get("*", (req, res) => {
  res.send("Hello, you are on the apex domain!");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
