const EC = require('elliptic').ec;

const ec = new EC('secp256k1'); //This the name of an elliptic algorithm that is used by bitcoin
//sec = standards of efficicient cryptography. P=prime number. 256 = bits. K = koblets (mathematician)

module.exports = {ec};