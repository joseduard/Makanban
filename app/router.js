const express = require("express");
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
// Recuperer UNE liste (:id c'est un parametre url )
router.get('/lists/:id', listController.getOneList);
router.get("/cards/:id", cardController.getOneCard)
router.get("/labels/id", labelController.getOneLabel)
// Créer une liste
router.post("/lists", listController.createList);
router.post("/cards", cardController.createCard);
router.post("/labels", labelController.createLabel);
// Modifier une liste
router.patch("/lists/:id", listController.updateList);
router.patch('/cards/:id', cardController.updateCard)
router.patch("/labels/id", labelController.updateLabel)
// Suprimer une liste
router.delete("/lists/:id", listController.deleteList);
router.delete('/cards/:id', cardController.deleteCard)
router.delete("/labels/id", labelController.deleteLabel)





module.exports = router;
