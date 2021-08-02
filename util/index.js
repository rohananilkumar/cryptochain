const EC = require('elliptic').ec;
const cryptoHash = require('./crypto-hash');

const ec = new EC('secp256k1'); //This the name of an elliptic algorithm that is used by bitcoin
//sec = standards of efficicient cryptography. P=prime number. 256 = bits. K = koblets (mathematician)

const verifySignature = ({publicKey, data, signature}) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');   //temp key to access validate function
    return keyFromPublic.verify(cryptoHash(data), signature);
}


module.exports = {ec, verifySignature};