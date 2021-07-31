const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', ()=>{
    let blockchain, newChain, originalChain;
    beforeEach(()=>{    //Creates a new blockchain object everytime so that the tests do not get modified data
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;   //Getting the original chain so that it does not change even it the original block chain gets replaced
    })

    it('conatins a `chain` array instance', ()=>{
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('Adds a new block to the chain', ()=>{
        const newData = 'foo bar';
        blockchain.addBlock({data:newData});
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    })

    describe('isValidChain()', ()=> {
        describe('when the chain does not start with the genesis block', ()=>{
            it('returns false', ()=>{
                blockchain.chain[0] = { data:'fake-genesis'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('when the chain starts with the genesis block and has multiple blocks.', ()=>{
            beforeEach(()=>{
                blockchain.addBlock({data:'Bears'});
                blockchain.addBlock({data:'Beets'});
                blockchain.addBlock({data:'Something else'});
            })

            describe('and a lastHash reference has changed', ()=>{
                it('returns false', ()=>{
                    blockchain.chain[2].lastHash = 'broken-hash';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
        

            describe('and the chain contains a block with an invalid field', ()=>{
                it('returns false', ()=>{
                    blockchain.chain[2].data='some-bad-and-evil-data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain does not contain an invalid blocks', ()=>{
                it('returns true', ()=>{
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                })
            })
        });
    });

    describe('replaceChain()', ()=>{
        let errorMock, logMock;

        beforeEach(()=>{
            errorMock = jest.fn();//Temporary methods for test
            logMock = jest.fn();

            global.console.error = errorMock;   //Setting the fake function to the console error function
            global.console.log = logMock;   //Setting the fake function to the console log function
        })

        describe('when the new chain is not longer', ()=>{
            beforeEach(()=>{
                newChain.chain[0] = { new:'chain' } //Changing the data in the chain

                blockchain.replaceChain(newChain.chain);    
            });

            it('does not replace the chain', ()=>{
                expect(blockchain.chain).toEqual(originalChain);    
            });

            it('logs an error', ()=>{
                expect(errorMock).toHaveBeenCalled();
            })
        });

        describe('when the chain is longer', ()=>{
            beforeEach(()=>{    //Making the new chain longer than the original chain
                newChain.addBlock({data:'Bears'});
                newChain.addBlock({data:'Beets'});
                newChain.addBlock({data:'Something else'});
            });

            describe('and the chain is invalid',()=>{
                beforeEach(()=>{
                    newChain.chain[2].hash='fake-chain';    //Invalidating the newChain
                    blockchain.replaceChain(newChain.chain);
                })

                it('does not replace the chain', ()=>{
                    expect(blockchain.chain).toEqual(originalChain);
                });
                it('logs an error', ()=>{
                    expect(errorMock).toHaveBeenCalled();
                })
            });

            describe('and the chain is valid', ()=>{
                beforeEach(()=>{
                    blockchain.replaceChain(newChain.chain);
                });

                it('replaces the chain', ()=>{
                    expect(blockchain.chain).toEqual(newChain.chain);
                });

                it('logs about the chain replacement', ()=>{
                    expect(logMock).toHaveBeenCalled();
                })
            })
        })
    })

});