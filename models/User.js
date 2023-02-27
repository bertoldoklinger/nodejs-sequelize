const { DataTypes } = require('sequelize');

const db = require('../db/db.js');

const User = db.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ocuppation: {
    type: DataTypes.STRING,
    required: true,
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
  }
})

module.exports = User;