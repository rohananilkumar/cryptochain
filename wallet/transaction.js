const uuid = require('uuid/v1');
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
}

module.exports = Transaction;