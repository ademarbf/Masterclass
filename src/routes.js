const express = require("express");
const UserController = require("./controllers/UserController");
const AddressController = require("./controllers/AddressController");
const TechController = require("./controllers/TechController");
const ReportController = require("./controllers/ReportController");

const routes = express.Router();

// routes.get("/", (req, res) => {
//   return res.json({ hello: "World" });
// });

//Usuário
routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

//Endereço - endereço para o usuário com o id em user_id
routes.get("/users/:user_id/addresses", AddressController.index);
routes.post("/users/:user_id/addresses", AddressController.store);

//Tecnologias - tecnologia para o usuário com o id em user_id
routes.get("/users/:user_id/techs", TechController.index);
routes.post("/users/:user_id/techs", TechController.store);
routes.delete("/users/:user_id/techs", TechController.delete);

//Reports
routes.get("/report", ReportController.show);

module.exports = routes;
