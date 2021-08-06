const Block = require("./block");
const {cryptoHash} = require("../util");


class Blockchain {
    constructor(){
        this.chain = [Block.genesis()]  //initializing the chain array
    }

    addBlock({data}){   //add block function
        const newBlock = Block.mineBlock({
            lastBlock:this.chain[this.chain.length-1],
            data
        });

        this.chain.push(newBlock);
    }

    replaceChain(chain, onSuccess){
        if(chain.length <= this.chain.length) return console.error('incoming chain must be longer'); //return if the incoming chain is smaller

        if(!Blockchain.isValidChain(chain)) return console.error('incoming chain must be valid');

        console.log('replacing chain with', chain);
        this.chain = chain;
        if(onSuccess) onSuccess();
    }

    static isValidChain(chain){
        //Checking for genesis block
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;   //Here just equals cannot be used as two objects cannot be equal in js
        
        //Checking for hash and last hash reference
        for( let i = 1; i< chain.length; i++){
            const {timeStamp, lastHash, hash, data, nonce, difficulty} = chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const actualHash = chain[i-1].hash;

            if(lastHash !== actualHash) return false;
            if(cryptoHash(timeStamp, lastHash, data, nonce, difficulty) !== hash) return false;
            if(Math.abs(lastDifficulty-difficulty)>1) return false; //Here we check the validity of the difficulty level
        }

        return true;
    }
}

module.exports = Blockchain;