const INITIAL_DIFFICULTY = 3;
const MINE_RATE = 1000; //Milliseconds
const isDevelopment = process.env.ENV === 'development';
const REDIS_URL = isDevelopment? 'redis://127.0.0.1:6379' :'redis://:p1f32bf6dc922714c83509048b3c32378d2d0f4a28e09c4e9f4005a857d53848d@ec2-54-164-11-40.compute-1.amazonaws.com:16559';


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
    MINING_REWARD,
    isDevelopment,
    REDIS_URL
};