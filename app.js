const express = require("express");
const bodyParser = require("body-parser");
const multerConfig = require("./util/multer");
const routes = require("./routes/main-route");
const cors = require("./util/cors");
const serverError = require("./util/server-error");
const rateLimiter = require("./util/rate-limiter");
const sequelizeConnect = require("./connection/database");

const app = express();

// require("./middlewares/services");
app.use(multerConfig);
app.use(bodyParser.json());
app.use("/public", express.static("public"));
app.use("/api/v1", cors, rateLimiter, routes);
app.use(serverError);
app.use("*", (req, res, next) => {
  res.status(404).json({ success: false, message: "Resource unavailable." });
});

sequelizeConnect
  .sync({
    //force: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started @ PORT ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

const port = process.env.PORT;