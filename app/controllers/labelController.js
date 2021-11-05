const { List, Card, Label } = require("../models/index");

const labelController = {
    // async car on utlise sequelize
    getAllLabels: async (req, res) => {
        try {
            const cards = await Card.findAll({
                include: {
                   all: true,
                   nested: true, 
                },

                order: [
                    ["position", "ASC"],
                ]
            })

            res.json(cards);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    getOneLabel: async (req,res) => {
        try {
            
        } catch (error) {
            
        }
    },

    createLabel: async (req,res) => {
        try {
            
        } catch (error) {
            
        }
    },

    updateLabel: async (req,res) => {
        try {
            
        } catch (error) {
            
        }
    },

    deleteLabel: async (req,res) => {
        try {
            
        } catch (error) {
            
        }
    },




};

module.exports = labelController;