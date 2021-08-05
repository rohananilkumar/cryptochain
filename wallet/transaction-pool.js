const Transaction = require("./transaction");

class TransactionPool{
    constructor(){
        this.transactionMap = {};
    }

    setTransaction(transaction){
        this.transactionMap[transaction.id] = transaction;
    }

    setMap(transactionMap){
        this.transactionMap = transactionMap;
    }

    existingTransaction({inputAddress}){
        const transactions = Object.values(this.transactionMap);

        return transactions.find(transaction=> transaction.input.address === inputAddress)
    }

    validTransactions(){
        const transactions = Object.values(this.transactionMap);

        return transactions.filter((transaction)=>Transaction.validTransaction(transaction));
    }

}
module.exports = TransactionPool;