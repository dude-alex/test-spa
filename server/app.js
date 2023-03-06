const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./db/routes/currencyRoutes");
const port = 8000;
const db =
  "mongodb+srv://test-user:lLYTw740dvzAvinF@cluster0.b1ip6d6.mongodb.net/node-currency?retryWrites=true&w=majority";

const startServer = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.use(cors());
    app.use(express.json());
    app.use("/", routes);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log("Run server error", error);
  }
};

startServer();
