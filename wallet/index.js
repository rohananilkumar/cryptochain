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

    createTransaction({recipient, amount}){
        if(amount > this.balance) {
            throw new Error('Amount exceeds balance');
        }

        return new Transaction({senderWallet:this, recipient, amount});
    }

}

module.exports = Wallet;