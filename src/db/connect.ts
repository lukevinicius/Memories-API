import mongoose from "mongoose";
import config from "../config/index";
import log from "../logger";

function connect() {
  return mongoose
    .connect(config.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}

export default connect;
