const {STARTING_BALANCE} = require('../config');
const { ec, cryptoHash } = require('../util');
const Transaction = require('./transaction');

class Wallet{
    constructor(){
        this.balance = STARTING_BALANCE;    //Setting our starting balance

        this.keyPair = ec.genKeyPair();   //Creates the public and private key

        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data){
        return this.keyPair.sign(cryptoHash(data))  //The sign method works best when the incoming data is hashed.
    }

    createTransaction({recipient, amount, chain}){
        if(chain){
            this.balance = Wallet.calculateBalance({
                chain,
                address:this.publicKey
            })
        }

        if(amount > this.balance) {
            throw new Error('Amount exceeds balance');
        }

        return new Transaction({senderWallet:this, recipient, amount});
    }

    static calculateBalance({chain, address}){
        let hasConductedTrasactions = false;
        let outputsTotal = 0;
        for(let i=chain.length-1; i>0; i--){    //loop reverse
            const block = chain[i];

            for(let transaction of block.data){
                if(transaction.input.address === address){
                    hasConductedTrasactions = true;
                }

                const addressOutput = transaction.outputMap[address];

                if(addressOutput){
                    outputsTotal = outputsTotal + addressOutput;
                }
            }
            if(hasConductedTrasactions) break;  //dont count the outputs after the transaction
        }
        return hasConductedTrasactions? outputsTotal : STARTING_BALANCE + outputsTotal;
    }


}

module.exports = Wallet;