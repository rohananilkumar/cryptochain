const Block = require("./block");
const cryptoHash = require("./crypto-hash");


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

    replaceChain(chain){
        if(chain.length <= this.chain.length) return console.error('incoming chain must be longer'); //return if the incoming chain is smaller

        if(!Blockchain.isValidChain(chain)) return console.error('incoming chain must be valid');

        console.log('replacing chain with', chain);
        this.chain = chain;
    }

    static isValidChain(chain){
        //Checking for genesis block
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;   //Here just equals cannot be used as two objects cannot be equal in js
        
        //Checking for hash and last hash reference
        for( let i = 1; i< chain.length; i++){
            const {timeStamp, lastHash, hash, data} = chain[i];

            const actualHash = chain[i-1].hash;

            if(lastHash !== actualHash) return false;
            if(cryptoHash(timeStamp, lastHash, data) !== hash) return false;
        }

        return true;
    }
}

module.exports = Blockchain;