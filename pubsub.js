const redis = require('redis');

const CHANNELS = {
    TEST:'TEST',
    BLOCKCHAIN:'BLOCKCHAIN'
}

class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain;

        this.publisher = redis.createClient();  //Able to publish when needed
        this.subscriber = redis.createClient(); //Able to listen when needed

        this.subscribeToChannels();

        this.subscriber.on('message', (channel, message)=>this.handleMessage(channel, message));    //Setting callback to the 'message' event
    }

    handleMessage(channel, message){
        console.log(`Message recieved. Channel:${channel}. Message:${message}`);

        const parsedMessage = JSON.parse(message);

        if(channel === CHANNELS.BLOCKCHAIN){
            this.blockchain.replaceChain(parsedMessage);    //Replace blockchain when new chain is received
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

}

module.exports = PubSub;
