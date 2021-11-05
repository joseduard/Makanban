const { List, Card } = require("../models/index");


const cardController = {
  // async car on utlise sequelize
  getCardsInList: async (req, res) => {
    try {
      const ListId = req.params.id;

      const cards = await Card.findAll({
        // where c'est ma condition pour trouver ls cards, donc il va nous donner toutes les cartes de une lste en particuler selon leur id
        where: {
          list_id: ListId,
        },
        // on inclu les labes, alors "as de labels c'est 'labels'"
        include: "labels",

        order: [["position", "ASC"]],
      });

      if (!cards) {
        res.status(404);
        json("Cannot find cards with list_id " + listId);
      } else {
        res.json(cards);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getOneCard: async (req, res) => {
    try {
      // recuperation de id (url)
      const cardId = req.params.id;

      const card = await Card.findByPk(cardId, {
        include: "labels",
      });

      if (!card) {
        res.status(404).json("Cannot find card with list_id " + CardtId);
      } else {
        res.json(card);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  createCard: async (req, res) => {
    try {
      const { title, color, list_id } = req.body;
      // une autre façon de gerer les errors
      let bodyErrors = [];

      if (!title) {
        bodyErrors.push("Title cannot be empty");
      }

      if (!list_id) {
        bodyErrors.push("List_id cannot be empty");
      }

      if (bodyErrors.length > 0) {
        res.status(400).json(bodyErrors);
      } else {
        // ici ona va creer notre card
        // build = crée notre entite (card) non sauvegardée
        // pas besoin de await car on n'a pas encore parlé à SQL
        let newCard = Card.build({title, list_id});

        // Si la color est present dans le body, je vais la "set"
        if (color) {
          // si un color est donnée dabns le body
          // alors.... je la set
          newCard.color = color;
        }

        // on sauvegarde l'éntite
        await newCard.save();
        // on renvoi l'éntite
        res.json(newCard);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  updateCard: async (req, res) => {
    try {
      // on recupere l'id
      const cardId = req.params.id;
      // on recupere tout ce que une carte contient
      const { title, color, list_id, position } = req.body;

      // d'abord je recupere la carte a modifier pour son id
      // et verifie si la card existe
      const card = await Card.findByPk(cardId, {
        include: ["labels"],
      });
      if (!card) {
        res.status(404).json(`Cant find card with id ${cardId}`);
      }

      // je modify le proprietes

      if (title) {
        card.title = title;
      }
      if (list_id) {
        card.list_id = list_id;
      }
      if (color) {
        card.color = color;
      }
      if (position) {
        card.position = position;
      }
      // je save la card
      await card.save();
      // je envoi le resutat
      res.json(card)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  deleteCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      let card = await Card.findByPk(cardId);
      if (!card) {
        res.status(404).json(`Cant find card with id ${cardId}`);
      } else {
        await card.destroy();
        res.json("Deleted card " + cardId);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = cardController;
