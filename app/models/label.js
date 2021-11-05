// on récupère les types et la classe modele
const { DataTypes, Model } = require("sequelize");

// on récupère notre instance sequelize de nous
const sequelize = require("../db");

class Label extends Model {}

Label.init(
  {
    name: DataTypes.TEXT,
    color: DataTypes.TEXT,
  },
  {
    sequelize,
    tableName: "label",
  }
);

module.exports = Label;
