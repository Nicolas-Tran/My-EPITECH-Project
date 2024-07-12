const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Apply = sequelize.define("apply", {
      postId: {
        type: Sequelize.INTEGER,
      },
      applyerId: {
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING(1300),
      },
      createdAt: {
        type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
      },
      updatedAt: {
        type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
      }
    });
  
    return Apply;
  };