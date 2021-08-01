const express = require('express');
const Blockchain = require('./blockchain');
const PubSub = require('./pubsub');
const app = express();
app.use(express.json());

const blockchain = new Blockchain();
const pubsub = new PubSub({blockchain});
setTimeout(()=>pubsub.broadcastChain(),1000)


app.get('/api/blocks', (req, res)=>{
    res.json(blockchain.chain);
});

app.post('/api/mine', (req, res)=>{
    const {data}  = req.body;
    blockchain.addBlock({data});
    res.redirect('/api/blocks');
});

const DEFAULT_PORT = 3000;
let PEER_PORT;
if(process.env.GENERATE_PEER_PORT === 'true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000);   //setting random number (3001-4000)
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, ()=>{
    console.log(`Running on ${PORT}...`)
})