const { assert } = require('chai')
const { default: Web3 } = require('web3')

const Decentragram = artifacts.require('./Decentragram.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Decentragram', ([deployer, author, tipper]) => {
  let decentragram

  before(async () => {
    decentragram = await Decentragram.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await decentragram.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await decentragram.name()
      assert.equal(name, 'Decentragram')
    })
  })
describe('images', async()=> {
  let result, imageCount
   const hash ='ABCD132'
  before(async () =>
    {
      result = await decentragram.uploadImage(hash, 'Image description', {from: author})
      imageCount = await decentragram.imageCount()
    })
  it('creates images', async() => {
//  let image = await decentragram.images(1)
//  console.log(image)
   assert.equal(imageCount, 1)
   const event = result.logs[0].args
   assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct' )
   assert.equal(event.hash,hash, 'hash is correct')
   assert.equal(event.description, 'Image description', ' description is correct')
   assert.equal(event.tipAmount, '0', 'tip amount is correct')
   assert.equal(event.author, author, 'author is correct')   

   //Failure : image must have hsh 
   await decentragram.uploadImage('', 'Image description', { from : author}).should.be.rejected;
     //failure: image must have hash 
     await decentragram.uploadImage('Image hash', '', { from : author}).should.be.rejected;

     it('lists images', async() => {
        const image = await decentragram.images(imageCount)
        assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct' )
        assert.equal(event.hash,hash, 'hash is correct')
        assert.equal(event.description, 'Image description', ' description is correct')
        assert.equal(event.tipAmount, '0', 'tip amount is correct')
        assert.equal(event.author, author, 'author is correct')   
      })
it('allow users to tip images' , async()=> {
  let oldAuthorBalance 
  oldAuthorBalance = await Web3.eth.getBalance(author)
  oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)
  result = await decentragram.tipImageOwner(imageCount, { from: tipper, value: web3.utils.toWei('1' , 'Ether')})

  //success
   const event = result.logs[0].args
   assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
   assert.equal(event.hash, hash, 'Hash is correct')
   assert.equal(event.description, 'Image description', 'description is correct')
   assert.equaal(event.tipAmount, '10000000000000000', 'tip amoun is correct')
   assert.equal(event.author, author, 'author is correct')

  //  let newAuthorBalance
  //  newAuthorBalance = await web3.eth.getBalance(author)  

   //check if the author has recieved the funds
  let newAuthorBalance 
  newAuthorBalance = await web3.eth.getBalance(author)
  newAuthorBalance = await web3.utils.BN(newAuthorBalance)

  let tipImageOwner
  tipImageOwner = await web3.eth.getBalance(author)
  tipImageOwner = new web3.utils.BN(newAuthorBalance)

  const expectedBalance = oldAuthorBalance.add(tipImageOwner)
  assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

  await decentragram.tipImageOwner(99, {from:tipper, value:web3.utils.toWei('1','Ether')})
})
    })
  }); 
})