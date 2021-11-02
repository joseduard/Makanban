// ici, on va tester nos requetes.

// on charge les variables d'environnement
require('dotenv').config();

const { List } = require('./app/models');
// Ici c'est une fucntion asyncro
const run = async () => {
    console.log('List.findAll');

    let lists = await List.findAll({
        include: [
            {   // associations correspond au alias"as" du fichier index.js
                association: 'cards',
                include: [{
                    association: 'labels'
                }]
            }
        ]
    });

    lists.forEach((list) => {
        let str = `La liste "${list.name}" contient les cartes : \n`;

        list.cards.forEach((card) => {
            str += `- ${card.title}\n`;

            card.labels.forEach((label) => {
                str += `    - ${label.name}\n`;
            })
        })

        console.log(str);
    });
};


run();