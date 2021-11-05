const { findByPk } = require("../models/card");
const { Card, Label } = require("../models/index");

const labelController = {
  // async car on utlise sequelize
  getAllLabels: async (req, res) => {
    try {
      const label = await Label.findAll();
      res.json(label);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getOneLabel: async (req, res) => {
    try {
    } catch (error) {}
  },

  createLabel: async (req, res) => {
    try {
      const { name, color } = req.body;

      let bodyErrors = [];
      if (!name) {
        bodyErrors.push("name can not be empty");
      }
      if (!color) {
        bodyErrors.push("color can not be empty");
      }

      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        let newLabel = Label.build({ name, color });
        await newLabel.save();
        res.json(newLabel);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  updateLabel: async (req, res) => {
    try {
      const labelId = req.params.id;
      const { name, color } = req.body;
      // On recupere un labl en base
      let label = await findByPk(labelId);
      if (!label) {
        res.status(404).json("Can not find label with id " + labelId);
      } else {
        // la modification
        if (name) {
          label.name = name;
        }

        if (color) {
          label.color = color;
        }
        // on save
        await label.save();
        // response
        res.json(label);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  deleteLabel: async (req, res) => {
    try {
      const labelId = req.params.id;
      let label = await Label.findByPk(labelId);
      if (!label) {
        res.status(404).json("Can not find label with id " + labelId);
      } else {
        await label.destroy();
        res.json("Deleted label with id " + labelId);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  addLabelToCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const labelId = req.body.labelId;

      let card = await Card.findByPk(cardId, {
        include: ["labels"],
      });
      // on récupère la card et le label
      // si un des deux n'existe pas ---> 404
      if (!card) {
        // avec return, je sors de la fonction : on arrete tout !
        return res.status(404).json("Can not find card with id " + cardId);
      }

      const label = await Label.findByPk(labelId);
      if (!label) {
        // avec return, je sors de la fonction : on arrete tout !
        return res.status(404).json("Can not find label with id " + labelId);
      }

      // on crée l'association, grace à la magie de sequelize
      await card.addLabel(label);

      // l'association a bien été crée en base.
      //  mais... l'instance de card n'a pas été mise à jour !
      // c'est une petite limitation de sequelize.
      // du coup -> je dois refaire un find de ma carte
      // afin de la renvoyer au client.
      // j'ai déja une variable card, je l'écrase (c'est un let)
      card = await Card.findByPk(cardId, {
        include: ["labels"],
      });

      // on va renvoyer la carte suite à sa modification
      res.json(card);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  removeLabelFromCard: async (req, res) => {
    try {
      const { cardId, labelId } = req.params;

      let card = await Card.findByPk(cardId, {
        include: ["labels"],
      });

      if (!card) {
        // avec return, je sors de la fonction : on arrete tout !
        return res.status(404).json("Can not find card with id " + cardId);
      }

      const label = await Label.findByPk(labelId);

      if (!label) {
        // avec return, je sors de la fonction : on arrete tout !
        return res.status(404).json("Can not find label with id " + labelId);
      }

      // on supprime l'association
      await card.removeLabel(label);

      // l'association a bien été crée en base.
      //  mais... l'instance de card n'a pas été mise à jour !
      // c'est une petite limitation de sequelize.
      // du coup -> je dois refaire un find de ma carte
      // afin de la renvoyer au client.
      // j'ai déja une variable card, je l'écrase (c'est un let)
      card = await Card.findByPk(cardId, {
        include: ["labels"],
      });

      // on va renvoyer la carte suite à sa modification
      res.json(card);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = labelController;
