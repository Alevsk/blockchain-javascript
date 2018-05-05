'use strict';

const chai = require('chai');
const Chain = require('./index.js');

const BlockChain = Chain.BlockChain;
const Block = Chain.Block;
const assert = chai.assert;
let voteChain = null;

describe('BlockChain', () => {
  it('Generate genesis block', () => {
    voteChain = new BlockChain();
    assert.lengthOf(voteChain.chain, 1);
    assert.equal(voteChain.chain[0].data, 'Genesis block');
  });
  it('Add some blocks', () => {
    voteChain.addBlock(new Block(1, new Date(), { user: 'Manuel', voted: 'PRI' }));
    voteChain.addBlock(new Block(2, new Date(), { user: 'Andres', voted: 'PAN' }));
    voteChain.addBlock(new Block(3, new Date(), { user: 'Julio', voted: 'PRD' }));
    voteChain.addBlock(new Block(4, new Date(), { user: 'Carlos', voted: 'PRI' }));
    voteChain.addBlock(new Block(5, new Date(), { user: 'Ruben', voted: 'PAN' }));
    voteChain.addBlock(new Block(6, new Date(), { user: 'Laura', voted: 'PRD' }));
    assert.lengthOf(voteChain.chain, 7);
  });
  it('Validate chain integrity', () => {
    assert.isOk(voteChain.isChainValid(), 'Block hashes are incorrect'); // this should return true
  });
  it('Changing random data in the BlockChain', () => {
    const min = 0; // first block id
    const max = 5; // for academic purpose this cannot be 6 (the last block id) due to double spend attack
    const blockId = Math.floor(Math.random() * (max - min + 1) + min); // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    const block = voteChain.chain[blockId];
    block.data = { user: block.data.user, voted: 'MORENA' }; // Changing block value
    block.hash = block.calculateHash(); // Re calculate the current block hash so no one notices the hack
    assert.isNotOk(voteChain.isChainValid(), 'Block hashes are incorrect'); // this should return false
  });
});