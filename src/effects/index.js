import {useEffect, useState} from 'react'
import Web3 from 'web3'

// var web3 = new Web3('https://mainnet.infura.io/v3/83b98a98c5ca4761ac26ad2e8210df97');
var web3 = new Web3('https://mainnet.infura.io/v3/2e01f669f9d6447a8ce6a02706dabc50');

let blockInfos = [];
let source = {}

const SOURCE_ADDRESSED_ARRAY = [
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a',
  '0xD551234Ae421e3BCBA99A0Da6d736074f22192FF',
  '0xdac17f958d2ee523a2206206994597c13d831ec7',
  '0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e',
  '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5',
  '0xfa52274dd61e1643d2205169732f29114bc240b3',
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  ]

const initBlock = async() => {
  const blockNumber = await web3.eth.getBlockNumber();
  for (var i = 0; i < 10; i++) {
    const blockInfo = await web3.eth.getBlock(blockNumber - i);
    blockInfos.push(blockInfo);
  }
}

const getLatestBlocks = async () => {
  const latestBlockNumber = await web3.eth.getBlockNumber();
  if(blockInfos.length > 0) {
    if(latestBlockNumber === blockInfos[9].number) return 
    const lastBlockNumber = blockInfos[9].number 
    const latestBLock = await web3.eth.getBlock(Number(lastBlockNumber)+1);
    blockInfos.unshift(latestBLock)
    blockInfos.pop()
  }
  
  console.log('blockInfos', blockInfos);
};

const sortingToAddresses = async(blockInfos) => {
  // debugger
  console.log('source 1', source)
  console.log('blockInfos.slice(0,10)', blockInfos.slice(0,10))
  for (let i of blockInfos.slice(0,10)) {
    for(let j of i.transactions) {
      const transaction = await web3.eth.getTransaction(j)
      if(SOURCE_ADDRESSED_ARRAY.includes(transaction.to)) {
        source[j] = source[j]+1 || 0
      }
    }
  }
  console.log('source', source)
}

export const GetBlockEffect = () => {
  const [intervalId, setIntervalId] = useState();
  useEffect(() => {
    if(!blockInfos.length) {
      initBlock()
    }
    const id = setInterval(getLatestBlocks, 10000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);
  return () => clearInterval(intervalId);
};

