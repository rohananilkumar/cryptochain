const Blockchain = require('./blockchain');
const blockchain = new Blockchain();

blockchain.addBlock({data:'initial'});

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;

const times = [];

for(let i=0; i<1000; i++){
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timeStamp;

    blockchain.addBlock({data:`block ${i}`});

    nextBlock = blockchain.chain[blockchain.chain.length-1];

    nextTimestamp = nextBlock.timeStamp;

    timeDiff = nextTimestamp - prevTimestamp;

    times.push(timeDiff);

    average = times.reduce((total, num)=> (total+num))/times.length;
    console.log(`Time to mine block: ${timeDiff}ms, Difficulty: ${nextBlock.difficulty}, averate time: ${average}ms`)
}