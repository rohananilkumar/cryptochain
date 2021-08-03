const uuid = require('uuid/v1');
const { verifySignature } = require('../util');
class Transaction{
    constructor({senderWallet, recipient, amount}){
        this.id = uuid();   //Creates a unique id
        this.outputMap = this.createOutputMap({senderWallet, recipient, amount}); //creates the outputmap
        this.input = this.createInput({senderWallet, outputMap:this.outputMap});
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
}

module.exports = Transaction;