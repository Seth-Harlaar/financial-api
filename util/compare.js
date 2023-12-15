



class ResourceCompare {

  // helper function for comparing two dates
  static compareDates(date1, date2){
    const newDate1 = new Date(date1);
    const newDate2 = new Date(date2);

    return (newDate1.getTime() === newDate2.getTime());
  }
  

  // compare two transacitons for equality
  static transactionsEqual(newTransaction, oldTransaction){
    if(newTransaction === null || oldTransaction === null){
      throw new Error('Encountered null object while comparing transactions.');
    }

    if(typeof newTransaction !== 'object' || typeof oldTransaction !== 'object'){
      throw new Error('Encounted non-object parameter while comparing transactions.');
    }


    // check every key value pair is the same
    for(let key of Object.keys(newTransaction)){

      // check key exists in both
      if(!oldTransaction.hasOwnProperty(key)){
        return false;
      }

      // compare values
      const val1 = newTransaction[key];
      const val2 = oldTransaction[key];

      // different function to normalize dates
      if(key === 'transaction_date'){
        const datesEqual = this.compareDates(val1, val2);

        if(!datesEqual){
          return false;
        }

      } else {
        if (val1 !== val2){
          return false;
        }
      }
    }

    return true;
  }


 
}









module.exports = ResourceCompare;