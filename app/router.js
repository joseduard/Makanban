const express = require("express");
const { updateList } = require("./controllers/listController");
const listController = require("./controllers/listController");
const cardController = require("./controllers/cardController");
const labelController = require("./controllers/labelController");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Server is running");
});

//Recuperer toutes les listes
router.get("/lists", listController.getAllLists);
// Recuepere les cards d'une liste
router.get("/lists/:id/cards", cardController.getCardsInList);
router.get("/labels", labelController.getAllLabels);
// Recuperer ONE
router.get("/lists/:id", listController.getOneList);
router.get("/cards/:id", cardController.getOneCard);
router.get("/labels/id", labelController.getOneLabel);
// Créer
router.post("/lists", listController.createList);
router.post("/cards", cardController.createCard);
router.post("/labels", labelController.createLabel);
// Modifier 
router.patch("/lists/:id", listController.updateList);
router.patch("/cards/:id", cardController.updateCard);
router.patch("/labels/id", labelController.updateLabel);
// Suprimer
router.delete("/lists/:id", listController.deleteList);
router.delete("/cards/:id", cardController.deleteCard);
router.delete("/labels/:id", labelController.deleteLabel);

// Routes d'asscociation

// ajouter un label à une carte
router.post("/cards/:id/labels", labelController.addLabelToCard);
// supprimer un label d'une carte
router.delete('/cards/:cardId/labels/:labelId', labelController.removeLabelFromCard);
// note !
// on aurait pu aussi, faire à l'inverse : ajouter une carte à un label etg suprimer une carte d'un label

module.exports = router;
