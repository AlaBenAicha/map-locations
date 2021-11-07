const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });
const dbConnect = require("./utils/dbConnect");
dbConnect();
app.use(express.json());
const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup.js"));
  app.use("/api/auth", require("./api/auth"));

  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, err => {
    if (err) throw err;
    console.log("Express server running");
  });
});
