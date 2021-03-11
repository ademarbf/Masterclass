const { Model, DataTypes } = require("sequelize");

class Address extends Model {
  static init(sequelize) {
    //recebe a conexão com  a base de dados
    super.init(
      {
        zipcode: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  //Relacionamento entre a tabela Addresses e Users
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Address;
