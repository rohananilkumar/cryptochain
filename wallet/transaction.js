const uuid = require('uuid/v1');
const { REWARD_INPUT, MINING_REWARD } = require('../config');
const { verifySignature } = require('../util');
class Transaction{
    constructor({senderWallet, recipient, amount, outputMap, input}){
        this.id = uuid();   //Creates a unique id
        this.outputMap = outputMap || this.createOutputMap({senderWallet, recipient, amount}); //creates the outputmap
        this.input = input || this.createInput({senderWallet, outputMap:this.outputMap});
    };

    createOutputMap({senderWallet, recipient, amount}){
        const outputMap = {};

        outputMap[recipient] = amount; //transaction from sender to reciever
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount; //transaction from sender to sender with reduced amount

        return outputMap;
    }

    createInput({senderWallet, outputMap}){
        return {
            timeStamp:Date.now(),
            amount:senderWallet.balance,
            address:senderWallet.publicKey,
            signature:senderWallet.sign(outputMap)
        }
    }

    static validTransaction(transaction){
        const {input:{address, amount, signature}, outputMap} = transaction;

        const outputTotal = Object.values(outputMap).reduce((total, outputAmount)=> total+outputAmount);

        if(amount!=outputTotal) {
            console.error(`Transaction invalid: amount has been tampered with on the address ${address}`);
            return false;
        }

        if(!verifySignature({publicKey: address, data:outputMap, signature})){
            console.error(`Transaction invalid: Signature has been tampered with on the address ${address}`);
            return false;
        }

        return true;
    }

    update({senderWallet, recipient, amount}){
        if(amount > this.outputMap[senderWallet.publicKey]){
            throw new Error('Amount exceeds balance');
        }

        if(!this.outputMap[recipient]){
            this.outputMap[recipient] = amount;
        } else {
            this.outputMap[recipient] += amount;
        }

        this.outputMap[senderWallet.publicKey] -= amount;
        this.input = this.createInput({senderWallet, outputMap:this.outputMap});
    }

    static rewardTransaction({minerWallet}){
        //Here we dont want to generate an input signature
        return new this({
            input:REWARD_INPUT,
            outputMap:{[minerWallet.publicKey]:MINING_REWARD}
        })
    }
}

module.exports = Transaction;