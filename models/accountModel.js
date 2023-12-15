const { DataTypes, Op } = require('sequelize');
const sequelize = require('../dbConfig');



// *******************************************
// ***          Model Definition           ***
// *******************************************

const Account = sequelize.define('Account', {
    accountid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }, 
    group: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'undefined',
    }
  }, {
    tableName: 'account',
    timestamps: false,
});



// *******************************************
// ***         Create operations           ***
// *******************************************

Account.createAccount = async (inputTitle, inputGroup) => {
  try {
    const createdAccount = await Account.create({title: inputTitle, group: inputGroup});
    return createdAccount;

  } catch (error) {
    throw new Error("(model) Error while creating account: " + error.message);
  }
}



// *******************************************
// ***          Get operations             ***
// *******************************************

Account.getAccount = async (accountTitleToFind) => {
  try {
    const foundAccounts = await Account.findAll({
      where: {
        title: accountTitleToFind
      }
    });

    return foundAccounts[0];

  } catch (error) {
    throw new Error("(model) Error while finding account: " + error.message);
  }
}

Account.getGroupAccounts = async (accountGroupToFind) => {
  try {
    const foundAccounts = await Account.findAll({
      where: {
        group: accountGroupToFind
      }
    });
    return foundAccounts;

  } catch (error) {
    throw new Error(`(model) Error while finding accounts in group : ${accountGroupToFind}` + error.message);
  }
}



module.exports = Account;