const { Op } = require("sequelize");
const User = require("../model/User");

module.exports = {
  async show(req, res) {
    //1 - Encontrar todos os usuários que termina com email: '@email.com'
    //2 - Desses usuários quero aqueles que moram na rua 'Rua da Avenida'
    //3 - Desses usuários quero buscar as tecnologias que comecam com 'React'

    const users = await User.findAll({
      //1
      attributes: ["name", "email"],
      where: {
        email: {
          [Op.like]: "%@email.com",
        },
      },

      include: [
        {
          //2
          association: "addresses",
          where: { street: "Rua da Avenida" },
        },
        {
          //3
          association: "techs",
          where: {
            name: {
              [Op.like]: "React%",
            },
          },
        },
      ],
    });

    return res.json(users);
  },
};
