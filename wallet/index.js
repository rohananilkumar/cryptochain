const {STARTING_BALANCE} = require('../config');
const { ec } = require('../util');

class Wallet{
    constructor(){
        this.balance = STARTING_BALANCE;    //Setting our starting balance

        const keyPair = ec.genKeyPair();   //Creates the public and private key

        this.publicKey = keyPair.getPublic().encode('hex');
    }
}

module.exports = Wallet;