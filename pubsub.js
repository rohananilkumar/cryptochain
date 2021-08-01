const redis = require('redis');

const CHANNELS = {
    TEST:'TEST'
}

class PubSub{
    constructor(){
        this.publisher = redis.createClient();  //Able to publish when needed
        this.subscriber = redis.createClient(); //Able to listen when needed

        this.subscriber.subscribe(CHANNELS.TEST);   //Subscribes to the channel that it's on

        this.subscriber.on('message', (channel, message)=>this.handleMessage(channel, message));    //Setting callback to the 'message' event
    }

    handleMessage(channel, message){
        console.log(`Message recieved. Channel:${channel}. Message:${message}`);
    }

}

const testPubSub = new PubSub();
setTimeout(()=>testPubSub.publisher.publish(CHANNELS.TEST, 'foo'), 1000);
