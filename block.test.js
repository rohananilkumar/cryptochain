const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

describe('Block', ()=>{
    const timeStamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({
        timeStamp,
        lastHash,
        hash,
        data,
    });

    it('has a timestamp, lastHash, hash, and data property', ()=>{
        expect(block.timeStamp).toEqual(timeStamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.difficulty).toEqual(difficulty);
        expect(block.nonce).toEqual(nonce);
    });

    describe('genesis()', ()=>{
        const genesisBlock = Block.genesis();

        it('returns a Block instance', ()=>{
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns the genesis data', ()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    });

    describe('mineBlock()', ()=>{
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({lastBlock, data});

        it('returns a Block instance', ()=>{
            expect(minedBlock instanceof Block).toBe(true);
        });

        it('sets the `lastHash` to be the `hash` of the lastBlock',()=>{
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('setns the `data`', ()=>{
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a `timeStamp`', ()=>{
            expect(minedBlock.timeStamp).not.toEqual(undefined);
        });

        it('creates a SHA-256 `hash` based on the proper inputs', ()=>{
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timeStamp, lastBlock.hash, data))
        })
    })
    
});