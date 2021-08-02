const {STARTING_BALANCE} = require('../config');
const { ec } = require('../util');
const cryptoHash = require('../util/crypto-hash');

class Wallet{
    constructor(){
        this.balance = STARTING_BALANCE;    //Setting our starting balance

        this.keyPair = ec.genKeyPair();   //Creates the public and private key

        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data){
        return this.keyPair.sign(cryptoHash(data))  //The sign method works best when the incoming data is hashed.
    }
}

module.exports = Wallet;