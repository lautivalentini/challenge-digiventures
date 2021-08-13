const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const mongoose = require("mongoose");

const urlMongo = `mongodb://localhost:27017/challlenge`;

mongoose.set("useCreateIndex", true);

mongoose.connect(urlMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
  .then((db) => console.log(`Connected to Mongo ${db.connection.port}`))
  .catch((err) => console.error(err))

//Configuration requires
const ConfigurationModel = require("./models/Inputs.js");
const ConfigurationService = require("./services/ConfigurationService");
const ConfigurationController = require("./controllers/ConfigurationController");

const UserModel = require("./models/Users");
const UserService = require("./services/UserService");
const UserController = require("./controllers/UserController");

//Configuration instances
const ConfigurationServiceInstance = new ConfigurationService(
  ConfigurationModel
);

const ConfigurationControllerInstance = new ConfigurationController(
  ConfigurationServiceInstance
);

const UserServiceInstance = new UserService(
  UserModel
);

const UserControllerInstance = new UserController(
  UserServiceInstance
);

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  //get configuration by path
  server.get("/configuration/:path", (req, res) =>
    ConfigurationControllerInstance.get(req, res)
  );
  
  server.post("/:path", (req, res) => 
    UserControllerInstance.post(req, res)
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
