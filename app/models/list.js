// On recupere le DataTypes qui von me permetre de definir le type de chaque champ et la classe Model qui va me permettre de etend a classe Model est on require sequelize
const {DataTypes, Model} = require('sequelize');

// On recupere notre instance sequelize, apres je fais la connexion au fichier db (dataBase)
const sequelize = require('../db');

class List extends Model { };

// On va initialiser notre Model List qui prend deux parametre, le premier c'est les attributs (une object qui contient des attributs) et le deuxieme c'est les options
//Description des propriétés du model
// On peut fourni soir un string avec le type de champ, soit un objet afin de définir plus de détail sur la propriété.
List.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    position: DataTypes.INTEGER
}, {
    // sequelize:sequelize =
    sequelize,
    // s'appelle short property
    tableName: "list"


});

module.exports = List;
