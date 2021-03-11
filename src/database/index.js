const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../model/User");
const Address = require("../model/Address");
const Tech = require("../model/Tech");

const connection = new Sequelize(dbConfig);

//Cadastro o model dentro da conexão
User.init(connection);
Address.init(connection);
Tech.init(connection);

//Passgem de parâmetros
User.associate(connection.models);
Address.associate(connection.models);
Tech.associate(connection.models);

module.exports = connection;
