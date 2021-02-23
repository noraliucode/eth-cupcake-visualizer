import logo from './logo.svg';
import './App.css';

import {useEffect, useState} from 'react'
import Web3 from 'web3'

var web3 = new Web3('https://mainnet.infura.io/v3/83b98a98c5ca4761ac26ad2e8210df97');

let blockInfos = [];

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

const GetBlockEffect = (handler, interval) => {
  const [intervalId, setIntervalId] = useState();
  useEffect(() => {
    if(!blockInfos.length) {
      initBlock()
    }
    const id = setInterval(handler, interval);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);
  return () => clearInterval(intervalId);
};

function App() {
  GetBlockEffect(getLatestBlocks, 10000)
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
