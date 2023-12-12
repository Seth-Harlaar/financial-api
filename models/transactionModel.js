const { DataTypes, Op } = require('sequelize');
const sequelize = require('../dbConfig');



// *******************************************
// ***          Model Definition           ***
// *******************************************

const Transaction = sequelize.define('Transaction', {
    tranid: {
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
    account: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  }, {
    tableName: 'transaction', 
    timestamps: false,
});



// *******************************************
// ***         Create operations           ***
// *******************************************

Transaction.createTransactions = async (tranData, account) => {
  try {
    const createdTransactions = await Transaction.bulkCreate(
      tranData.map((transaction) => {
        const newTransaction = {...transaction, "account": account};
        console.log(newTransaction);
        return {...transaction, "account": account}
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

Transaction.getTransactions = async (type, inputStartDate, inputEndDate, inputAccount) => {

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
  searchParams.where = {...searchParams.where, account: inputAccount};

  try {
    const {count, rows} = await Transaction.findAndCountAll(searchParams);

    console.log(count + " found:");
    console.log(rows);

    return {
      "count": count,
      "transactions": rows
    };
    
  } catch (error) {
    throw new Error("(model) Error while getting transactions: " + error.message);
  }
}



// *******************************************
// ***         Delete operations           ***
// *******************************************

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



// export
module.exports = Transaction;