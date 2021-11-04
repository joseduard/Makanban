const express = require('express');
const listController = require('./controllers/listController');
const router =  express.Router();

router.get('/', (req, res) => {
    res.send('Server in running');
})
//Recuperer toutes les listes
router.get('/lists', listController.getAllLists);
// Recuperer UNE liste (:id c'est un parametre url )
router.get('/lists/:id,', listController.getOneList)
// Créer une liste
router.post('/lists', listController.createList);
// Modifier une liste
router.patch('/lists/:id', listController.updateList);
// Suprimer une liste
router.delete('/lists/:id', listController.DeleteList);

module.exports = router;