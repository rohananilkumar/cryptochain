const crypto = require('crypto'); //native crypto package for nodejs

const cryptoHash = (...args) => {
    const hash = crypto.createHash('sha256');
    hash.update(args.sort().join(' ')); //Sets the input for the hash
    return hash.digest('hex');  //Returns the result of the hash
};

module.exports = cryptoHash;