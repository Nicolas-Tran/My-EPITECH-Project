module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      adress:{
        type: Sequelize.STRING
      },
      number:{
        type: Sequelize.STRING
      },
    });
  
    return User;
  };