const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const App = sequelize.define('App', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING,
        defaultValue: 'General'
    }
});

module.exports = App;
