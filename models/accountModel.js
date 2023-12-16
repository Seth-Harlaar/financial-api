const { DataTypes, Op } = require('sequelize');
const sequelize = require('../dbConfig');



// *******************************************
// ***          Model Definition           ***
// *******************************************

const Account = sequelize.define('Account', {
    accountId: {
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

Account.getAccount = async (accountId) => {
  try {
    const foundAccounts = await Account.findAll({
      where: {
        accountId: accountId
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
    throw new Error(`(model) Error while finding accounts in group ${accountGroupToFind}: ` + error.message);
  }
}



// *******************************************
// ***         Update operations           ***
// *******************************************

Account.updateAccount = async (accountToUpdateId, accountData) => {
  try {
    const updatedAccount = await Account.update(accountData, {
      where: {
        accountId: accountToUpdateId
      }
    });

    return updatedAccount;
  } catch (error){
    throw new Error(`(model) Error while updating account with ID ${accountToUpdateId}: ` + error.message);
  }
}



// *******************************************
// ***         Delete operations           ***
// *******************************************

Account.deleteAccount = async (accountToDeleteId) => {

  try {
    const deleted = await Account.destroy({
      where: {
        accountId: accountToDeleteId
      }
    });

    if(deleted === 0){
      throw new Error("No account found mathcing that ID.");
    }

    return deleted;
    
  } catch (error) {
    throw new Error("(model) Error while deleting account: " + error.message);
  }

}

module.exports = Account;