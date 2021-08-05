const INITIAL_DIFFICULTY = 3;
const MINE_RATE = 1000; //Milliseconds

const GENESIS_DATA = {
    timeStamp: 1,
    lastHash:'--------',
    hash:'hash-one',
    difficulty:INITIAL_DIFFICULTY,
    nonce:0,
    data:[],
};

const STARTING_BALANCE = 1000;

const REWARD_INPUT = {
    address:'*authorize-reward'
};

const MINING_REWARD = 50;

module.exports = {
    GENESIS_DATA, 
    MINE_RATE, 
    STARTING_BALANCE,
    REWARD_INPUT,
    MINING_REWARD
};