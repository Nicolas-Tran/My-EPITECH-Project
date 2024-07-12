const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Offers = sequelize.define("offers", {
      posterId: {
        type: Sequelize.INTEGER,
      },
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
      image: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING
      },    
      wages: {
        type: Sequelize.STRING
      },  
      workTime: {
        type: Sequelize.STRING
      },
      fullDescription: {
        type: Sequelize.STRING(3000)
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
  
    return Offers;
  };