const uuid = require('uuid/v1');
class Transaction{
    constructor({senderWallet, recipient, amount}){
        this.id = uuid();   //Creates a unique id
        this.outputMap = this.createOutputMap({senderWallet, recipient, amount}); //creates the outputmap
    };

    createOutputMap({senderWallet, recipient, amount}){
        const outputMap = {};

        outputMap[recipient] = amount; //transaction from sender to reciever
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount; //transaction from sender to sender with reduced amount

        return outputMap;
    }
}

module.exports = Transaction;