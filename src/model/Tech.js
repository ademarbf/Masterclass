const { Model, DataTypes } = require("sequelize");

class Tech extends Model {
  static init(sequelize) {
    //recebe a conexão com  a base de dados
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "techs",
      }
    );
  }

  //Relacionamento entre a tabela Addresses e Users
  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: "tech_id",
      through: "user_techs",
      as: "users",
    });
  }
}

module.exports = Tech;
