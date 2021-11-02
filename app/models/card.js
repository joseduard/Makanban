
// on récupère les types et la classe modele
const { DataTypes, Model } = require('sequelize');

// on récupère notre instance sequelize de nous
const sequelize = require('../db');

class Card extends Model { };

Card.init({
    title: DataTypes.TEXT,
    color: DataTypes.TEXT,
    list_id: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
}, {
    sequelize,
    tableName: "card"
});

module.exports = Card;