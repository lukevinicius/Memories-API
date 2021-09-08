import express from "express";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";

const PORT = process.env.PORT || 3000

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  log.info(`🚀 Server started on port 3000!`);

  connect();

  routes(app);
});
