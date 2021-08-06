const Transaction = require("../wallet/transaction");

class TransactionMiner{
    constructor({blockchain, transactionPool, wallet, pubsub}){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }
    mineTransactions(){
        //Get the transaction pool's valid transacions
        const  validTransactions = this.transactionPool.validTransactions();

        //Generate the miner's reward
        validTransactions.push(
            Transaction.rewardTransaction({minerWallet:this.wallet})
        );

        //add a block consiting of these transactions to the blockchain
        this.blockchain.addBlock({data: validTransactions});

        //broadcast the updated blockchain
        this.pubsub.broadcastChain();

        //clear pool
        this.transactionPool.clear();

    }
}

module.exports = TransactionMiner;