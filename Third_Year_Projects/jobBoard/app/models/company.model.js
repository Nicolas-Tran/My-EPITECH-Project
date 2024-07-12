const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
      profile: {
        type: Sequelize.STRING,
      },
      companySize: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },    
      fullDescription: {
        type: Sequelize.STRING
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
  
    return Company;
  };