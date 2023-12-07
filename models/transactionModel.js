const { DataTypes, Op } = require('sequelize');
const sequelize = require('../dbConfig');

const Transaction = sequelize.define('Transaction', {
    tranid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: true,
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
    account: {
      type: DataTypes.STRING(50),
      allNull: false,
    }
  }, {
    tableName: 'transaction', 
    timestamps: false,
});




Transaction.getTransactions = async (type, startDate, endDate) => {
  try {
    const transactions = await Transaction.findAll();
    console.log(transactions);
    return transactions;
  } catch (error) {
    console.log();
    
  }
}







// create operations
Transaction.createTransactions = async (tranData, account ) => {
  try {
    const createdTransactions = await Transaction.bulkCreate(
      tranData.map((transaction) => {
        return {...transaction, "acount": account}
      })
    );
    console.log(createdTransactions);
    return this.createdTransactions;

  } catch (error){
    console.log("(model) error when created multiple transactions: " + error);
  }
}


Transaction.createTransaction = async (tranData, callback) => {
  try {
    const {transactionDate, description, debit, credit, balance, category, account } = tranData;

    const createdTransaction = await Transaction.create({
      transaction_date: transactionDate,
      description: description,
      debit: debit,
      credit: credit,
      balance: balance,
      category: category,
      account: account,
    }).then(newUser => {
      callback(null, newUser.dataValues);
    });

    callback(null, createdTransaction);
  } catch (error) {
    callback(error, null);
  }
}


// read operations




Transaction.getAllTransactions = async (callback) => {
  try {
    const transactions = await Transaction.findAll();
    callback(null, transactions);
  } catch (error) {
    callback(error, null);
  }
};

Transaction.getDebitTransactions = async (callback) => {
  try {
    const debits = await Transaction.findAll({
      where: {
        debit: {
          [Op.not]: null,
        }
      }
    });
    callback(null, debits);
  } catch (error) {
    callback(error, null);
  }
}

Transaction.getCreditTransactions = async (callback) => {
  try {
    const credits = await Transaction.findAll({
        where: {
          credit: {
            [Op.not]: null,
          }
      }
    });
    callback(null, credits);
  } catch (error) {
    callback(error, null);
  }
}

Transaction.getTransactionsByDay = async (date, callback) => {
  try {
    // create dates that surround the entire day
    const startDate = new Date(date);
    const endDate = new Date(new Date(date).setDate(startDate.getDate() + 1));

    const dayTransactions = await Transaction.findAll({
      where: {
        transaction_date: {
          [Op.between]: [startDate, endDate]
        }
      }
    });
    callback(null, dayTransactions);
  } catch (error) {
    callback(error, null);
  }
}

Transaction.getTransactionsByMonth = async (month, year, callback) => {
  try {
    const monthTransactions = await Transaction.findAll({
      where: {
        [Op.and] : [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('transaction_date')), month),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('transaction_date')), year),
        ],
      },
    });

    if (callback === "function" ){
      callback(null, monthTransactions);
    } else {
      return monthTransactions;
    }

  } catch (error) {
    if (callback === "function"){
      callback(error, null);
    } else {
      return null;
    }
  }
}

Transaction.getTransactionsByYear = async (year, callback) => {
  try {
    const yearTransactions = await Transaction.findAll({
      where: sequelize.where(sequelize.fn('YEAR', sequelize.col('transaction_date')), year),
    });

    callback(null, yearTransactions);
  } catch (error) {
    callback(error, null);
  }
}

Transaction.getTransactionBetweenDates = async (inputStartDate, inputEndDate, callback) => {
  try {
    // normalize times to 0
    const startDate = new Date(inputStartDate);
    const endDate = new Date(inputEndDate);

    const betweenTransactions = await Transaction.findAll({
      where: {
        transaction_date: {
          [Op.between]: [startDate, endDate]
        }
      }
    })

    callback(null, betweenTransactions);
  } catch (error) {
    callback(error, null);
  }
}

Transaction.getTransactionsAfterDate = async (inputStartDate, callback) => {
  try {
    // normalize time to 0
    const startDate = new Date(inputStartDate);

    const afterTransactions = await Transaction.findAll({
      where: {
        transaction_date: {
          [Op.gte]: startDate,
        },
      },
    })

    callback(null, afterTransactions);
  } catch (error) {
    callback(error, null);
  }
}


Transaction.getTransactionsBeforeDate = async (inputEndDate, callback) => {
  try {
    // normalize time to 0
    const endDate = new Date(inputEndDate);

    const beforeTransactions = await Transaction.findAll({
      where: {
        transaction_date: {
          [Op.lte]: endDate,
        },
      },
    })

    callback(null, beforeTransactions);
  } catch (error) {
    callback(error, null);
  }
}


// delete operations
Transaction.deleteTransaction = async (id, callback) => {
  try {
    const deleted = await Transaction.destroy({
      where: {
        tranid: id,
      }
    })

    callback(null, deleted);
  } catch (error){
    callback(error, null);
  }
}


module.exports = Transaction;