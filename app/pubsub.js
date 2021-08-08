const redis = require('redis');
const { REDIS_URL } = require('../config');

const CHANNELS = {
    TEST:'TEST',
    BLOCKCHAIN:'BLOCKCHAIN',
    TRANSACTION:'TRANSACTION'
}

class PubSub{
    constructor({blockchain, transactionPool}){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;

        this.publisher = redis.createClient(REDIS_URL);  //Able to publish when needed
        this.subscriber = redis.createClient(REDIS_URL); //Able to listen when needed

        this.subscribeToChannels();

        this.subscriber.on('message', (channel, message)=>this.handleMessage(channel, message));    //Setting callback to the 'message' event
    }

    handleMessage(channel, message){
        console.log(`Message recieved. Channel:${channel}. Message:${message}`);

        const parsedMessage = JSON.parse(message);

        switch(channel){
            case CHANNELS.BLOCKCHAIN:
                this.blockchain.replaceChain(parsedMessage, true, ()=>{
                    this.transactionPool.clearBlockchainTransactions({chain:parsedMessage});    //Here
                });
                break;
            case CHANNELS.TRANSACTION:
                this.transactionPool.setTransaction(parsedMessage);
                break;
            default:
                return;
        }
    }

    subscribeToChannels(){
        Object.values(CHANNELS).forEach(channel=>{
            this.subscriber.subscribe(channel);
        })
    }

    publish({channel, message}){
        this.subscriber.unsubscribe(channel, ()=>{  //unsubscribing from the channel
            this.publisher.publish(channel, message,()=>{      //Broadcasting to the channel
                this.subscriber.subscribe(channel);     //Resubscribing to the channel
            });
        });
    }

    broadcastChain(){
        console.log(this.blockchain);
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain)   //Boradcast chain 
        })
    }

    broadcastTransaction(transaction){
        this.publish({
            channel:CHANNELS.TRANSACTION,
            message:JSON.stringify(transaction)
        })
    }

}

module.exports = PubSub;
