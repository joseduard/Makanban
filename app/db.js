// Je vais creer ma conexion à la base de données
// je vais importer sequelize
const { Sequelize } = require('sequelize');

// créé une instance de sequelize
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        // undercored true permet de faire une correspondance entre camelCase et snake_case
        underscored: true,
        createdAt: 'created_at',
        updateAt: 'update_at',
    
    }

});

// on va exporter sequelize

module.exports = sequelize;