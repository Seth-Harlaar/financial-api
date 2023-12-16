const { DataTypes, Op } = require('sequelize');
const sequelize = require('../dbConfig');
const ResourceCompare = require('../util/compare');


// *******************************************
// ***          Model Definition           ***
// *******************************************

const Transaction = sequelize.define('Transaction', {
    tranId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    debit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    credit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Account', 
        key: 'accountId', 
      },
    }
  }, {
    tableName: 'transaction', 
    timestamps: false,
});



// *******************************************
// ***         Create operations           ***
// *******************************************

Transaction.createTransactions = async (tranData, accountId) => {
  try {
    const createdTransactions = await Transaction.bulkCreate(
      tranData.map((transaction) => {
        const newTransaction = {...transaction, accountId: accountId};
        console.log(newTransaction);
        return {...transaction, accountId: accountId};
      })
    );

    return createdTransactions;

  } catch (error){
    throw new Error("(model) Error while creating transactions: " + error.message);
  }
}



// *******************************************
// ***          Get operations             ***
// *******************************************

Transaction.getTransactions = async (type, inputStartDate, inputEndDate, inputAccountId) => {

  const searchParams = {};

  // select by type
  if(type){
    if(type === "debit"){
      searchParams.where = {...searchParams.where, 
        debit: {
          [Op.not]: null
        }
      };
    
    } else if (type === "credit"){
      searchParams.where = {...searchParams.where, 
        credit: {
          [Op.not]: null
        }
      };
    }
  }

  // select by date
  // modify start and end dates to normalize to time 0
  const startDate = new Date(inputStartDate);
  const endDate = new Date(inputEndDate);

  if(inputStartDate){
    searchParams.where = {...searchParams.where,
      transaction_date: {
        [Op.gte]: startDate,
      },
    }
  }

  if(inputEndDate){
    searchParams.where = {...searchParams.where,
      transaction_date: {
        [Op.lte]: endDate,
      },
    }
  }

  // required search by account
  searchParams.where = {...searchParams.where, accountId: inputAccountId};

  try {
    const {count, rows} = await Transaction.findAndCountAll(searchParams);

    return {
      "count": count,
      "transactions": rows
    };
    
  } catch (error) {
    throw new Error("(model) Error while getting transactions: " + error.message);
  }
}



// *******************************************
// ***         Update operations           ***
// *******************************************

Transaction.updateTransactions = async (idsToUpdate, tranData) => {
  try {
    let updatedRows = 0;
    let i = 0;

    while( i < idsToUpdate.length ){
      // count matching ids
      const count = await Transaction.count({
        where: {
          tranId: idsToUpdate[i]
        }
      });

      if (count === 0){
        throw new Error(`Transaction with ID ${idsToUpdate[i]} could not be found.`);
      }

      const updatedRow = await Transaction.update(tranData[i], {
        where: {
          tranId: idsToUpdate[i]
        }
      });
      
      if(updatedRow[0] === 1){
        updatedRows++;
      } else {
        throw new Error(`Transaction with ID ${idsToUpdate[i]} could not be updated.`);
      }

      i++;
    }

    return updatedRows;

  } catch (error) {
    throw new Error("(model) Error while updating transactions: " + error.message);
  }
}

// *******************************************
// ***         Delete operations           ***
// *******************************************

Transaction.deleteTransactions = async (idsToDelete, inputAccountId) => {
  try {
    const deleted = await Transaction.destroy({
      where: {
        tranId: idsToDelete,
        accountId: inputAccountId,
      }
    });

    if(deleted === 0){
      throw new Error("No matching rows found for that account.");
    }

    return deleted;
    
  } catch (error) {
    throw new Error("(model) Error while deleting transactions: " + error.message);
  }
}



// export
module.exports = Transaction;