const { List } = require("../models/index");
const { Op } = require("sequelize");
const listController = {
  // on va recuperer toutes les lists avec await, donc on doit etre dans une function async. Le contreleur ont parler au sequelize, on recupere les lists via sequelize
  getAllLists: async (req, res) => {
    try {
      const lists = await List.findAll({
        include: {
          //all:true Ici il va recuperer toutes les association de premier niveau
          association: "cards",
          //nested:true Ici il va recuperer toutes les asociation de deuxieme niveau
          include: "labels",
        },
        // on va envoyer nos lister por la position de list trier par position
        order: [
          // on trie les listes par positio
          ["position", "ASC"],
          // dedans on trie les cartes , par position ausii
          ["cards", "position", "ASC"],
        ],
      });

      // je renvoie le resultat, en JSON
      res.json(lists);
    } catch (error) {
      console.log(error);
      // code 500 erreur en server
      res.status(500).json(error.toString());
    }
  },
  
  //all:true Ici il va recuperer toutes les association de premier niveau
  //nested:true Ici il va recuperer toutes les asociation de deuxieme niveau
  // on va faire le "test" pour savoir si list exist sino on envoi un erreur 404
  getOneList: async (req, res) => {
    try {
      // Je recupere mon id avec req.params.id car dans ma route le /:id c'est un parametre de URL
        const listId = req.params.id;

        const list = await List.findByPk(listId, {
            include: {
                // all : récupérer toutes les associations
                // de premier niveau
                // ici on en a une seule : cards
                all: true,
                // nested : récupère toutes les sous-associations
                // tout ce qui est en dessous quoi...
                // en dautres termes -> en cascade
                nested: true,
            },
            order: [
                ['cards', 'position', 'ASC']
            ]
        });
        if (list) {
            res.json(list);
        } else {
            res.status(404).json('Cannot find list with id ' + listId);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.toString());
    }
},
  createList: async (req, res) => {
    try {
      // Pour creer ma liste je besoin de recuperer les proprietes name et position avec req.body;
      // je peut faire:
      // const name = req.body.name et
      // const position = req.body.position
      // mais ici j'ai utilise la destructuring
      const { name, position } = req.body;

      if (!name) {
        // si est vrai que y'a pas de nom
        // -> erreur 400
        res.status(400).json("Name cannot be empty");
      } else {
        // si on arrive ici, la requete est bien formulée.
        const result = await List.create({
          // ici c'est un object
          name,
          // equivalent de name: name
          position,
          // equivalent de position: position
        });

        // je renvoie le résultat de mon insertion, c'est le resultat de mon appelle a sequelize
        res.json(result);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
  updateList: async (req, res) => {
    try {
      // id depuis l'url
      const listId = req.params.id;

      // récupération de la liste.
      const list = await List.findByPk(listId);

      if (!list) {
        // si pas de liste -> 404
        res.status(404).send("Cant find list with id " + listId);
      } else {
        // la liste existe -> go on la modifie
        const { name, position } = req.body;

        // tant qu'a faire, on ne va modifier que les parametres présents
        // sinon, si un parametre est manquant, on risquerait
        // d'effacer l'ancien en mettant undefined a la place... oups !

        if (name) {
          // si le nom existe... on écrase
          list.name = name;
        }

        if (position) {
          // si la position existe... on écrase
          list.position = position;
        }

        // on sauvegarde notre liste.
        await list.save();

        // et on la renvoie.
        res.json(list);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }

    // d'abord, je récupère la liste, via son ID

    // ensuite, je modifie suivant ce qui provient du body.

    // je sauvegarde dans sequelize...

    // et je renvoie le tout.
  },
  DeleteList: async (req, res) => {
    try {
      const list = await List.destroy({
        where: {
          id: req.params.id,
        },
      });
      // on envoi un message de information
      res.json("Delete list " + req.params.id);
    } catch (error) {
      console.log(error);
      // code 500 erreur en server
      res.status(500).json(error.toString());
    }
  },
};

module.exports = listController;
