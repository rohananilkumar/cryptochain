class TransactionMiner{
    constructor({blockchain, transactionPool, wallet, pubsub}){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }
    mineTransaction(){
        //Get the transaction pool's valid transacions

        //Generate the miner's reward

        //add a block consiting of these transactions to the blockchain

        //broadcast the updated blockchain

        //clear pool
    }
}

module.exports = TransactionMiner;