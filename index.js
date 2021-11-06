// on charge nos variables d'environnement
require("dotenv").config();
// cors
const cors = require('cors');

// on charge express
const express = require("express");
// on charge nore router
const router = require("./app/router");
// middleware de nettoyage du body (anti XSS)
const bodySanitizer = require('./app/middlewares/body-sanitizer');

// on definit un port
const port = process.env.PORT || 5050;
const app = express();
// middlewarre cors
// on autorise toute connexion entrante, quelque soit le domaine
// ici on a mis étoile ---> ca veut dire "TOUT"
// plus tard, vous apprendrez à 
// autoriser seulement les requetes depuis un domaine précis
//    exemple : app.mastartup.fr peut parler a api.mastartup.fr
// autoriser seulement certaines méthodes HTTP
//    exemple : on laisse passer les GET qui viennent de partout
// mais que les POST d'un domaine précis
app.use(cors('*'));
// on charge le middleware pour gérer le body du POST
app.use(express.urlencoded({ extended: true }));
// middleware qui nettoie les body
app.use(bodySanitizer);
// on charge le router
app.use(router);

// on lance le serveur
app.listen(port, (_) => {
  console.log(`http://localhost:${port}`);
});
