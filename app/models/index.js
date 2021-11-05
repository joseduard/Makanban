// On require nos MODELS qu'on a de base (Sans association)
const Card = require("./card");
const List = require("./list");
const Label = require("./label");

// Associations qu'on va ajouter dans le MODELES (Avec association)

// une carte a plusieurs labels
// notre table de liason
Card.belongsToMany(Label, {
  as: "labels",
  through: "card_has_label",
  foreignKey: "card_id",
  // c'est une clé suplementaire
  otherKey: "label_id",
  // on veut désactiver le updated_at a niveau sequelize
  timestamps: false,
});

// un label a plusieurs cartes
Label.belongsToMany(Card, {
  as: "cards",
  through: "card_has_label",
  foreignKey: "label_id",
  otherKey: "card_id",
  // on veut désactiver le updated_at
  timestamps: false,
});

// une liste a plusieurs cartes
List.hasMany(Card, {
  as: "cards",
  foreignKey: "list_id",
});

// Une carte a une seule liste.
Card.belongsTo(List, {
  as: "list",
  foreignKey: "list_id",
});

// on exporte tous nos models
module.exports = { Card, List, Label };
