import express from "express";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
  log.info(`🚀 Server started on port 3000!`);

  connect();

  routes(app);
});
