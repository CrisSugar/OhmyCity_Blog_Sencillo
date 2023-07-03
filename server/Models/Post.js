const { DataTypes } = require('sequelize');
const sequelize = require('../dbConn');

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
/*   email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  } */
});

module.exports = Post;
