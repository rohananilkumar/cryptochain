const { GENESIS_DATA } = require("./config");
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
        const {difficulty, hash:lastHash} = lastBlock;
        let hash, timestamp;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty)
        } while(hash.substring(0,difficulty)!=='0'.repeat(difficulty));

        return new this({
            timeStamp: timestamp,
            lastHash,
            data,
            difficulty,
            nonce,
            hash:cryptoHash(timestamp, lastHash, data, nonce, difficulty),
        });
    }
}


module.exports = Block;