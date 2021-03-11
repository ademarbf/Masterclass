const User = require("../model/User");
const Tech = require("../model/Tech");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: "techs", through: { attributes: [] } },
    });

    //through: { attributes: [] } não retorna  vinculo de techs com user (users_tech)

    return res.json(user.techs);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body; //Nome da tech

    const user = await User.findByPk(user_id);

    //Verifica se o usuário existe
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    //findOrCreate retorna a tech e um valor boolean, mas vamos usar somente o retorno tech
    const [tech] = await Tech.findOrCreate({
      where: { name },
    });

    //Quando utilizado o belongsToMany na controller, ele relaciona um tech com um user
    await user.addTech(tech);

    return res.json(tech);
  },

  async delete(req, res) {
    const { user_id } = req.params;
    const { name } = req.body; //Nome da tech

    const user = await User.findByPk(user_id);

    //Verifica se o usuário existe
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    //Verifica se tech existe
    const tech = await Tech.findOne({
      where: { name },
    });

    await user.removeTech(tech);

    return res.json();
  },
};
