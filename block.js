const { GENESIS_DATA, MINE_RATE } = require("./config");
const hexToBinary = require('hex-to-binary');
const cryptoHash = require("./crypto-hash");

class Block{
    constructor({ timeStamp, lastHash, hash, data, nonce, difficulty} ){
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {    //here
        return new this(GENESIS_DATA);
    };

    static mineBlock({ lastBlock, data}) {
        let difficulty = lastBlock.difficulty;
        const { hash:lastHash} = lastBlock;
        let hash, timestamp;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock:lastBlock, timeStamp:timestamp});
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty)
        } while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));

        return new this({
            timeStamp: timestamp,
            lastHash,
            data,
            difficulty,
            nonce,
            hash:cryptoHash(timestamp, lastHash, data, nonce, difficulty),
        });
    };

    static adjustDifficulty({originalBlock, timeStamp}){
        const {difficulty} = originalBlock;
        if(difficulty<1) return 1
        const difference = (timeStamp-originalBlock.timeStamp);
        if(difference>MINE_RATE)
        {
            return difficulty-1;
        }
        return difficulty+1;
    }
}


module.exports = Block;