// on charge nos variables d'environnement
require('dotenv').config();
// on charge express
const express = require('express');
// on charge nore router
const router = require('./app/router');
// on definit un port
const port = process.env.PORT || 3000;
const app = express();
// on charge le middleware pour gérer le body du POST
app.use(express.urlencoded({extended: true}));
// on charge le router
app.use(router);

// on lance le serveur
app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});

