import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import Web3 from 'web3'

var web3 = new Web3('https://mainnet.infura.io/v3/83b98a98c5ca4761ac26ad2e8210df97');
// var web3 = new Web3('https://mainnet.infura.io/v3/2e01f669f9d6447a8ce6a02706dabc50');

const SOURCE_ADDRESSES = {
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D': 'uniswap',
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f': 'uniswap',
  '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a': 'uniswap',
  '0xD551234Ae421e3BCBA99A0Da6d736074f22192FF': 'binance',
  '0xdac17f958d2ee523a2206206994597c13d831ec7': 'Tether',
  '0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e': 'dYdX',
  '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5': 'Compound', 
  '0xfa52274dd61e1643d2205169732f29114bc240b3': 'Kraken',
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'makerDAO',
  } 

  const TOTAL_BLOCK = 1

function App() {
  
  const [counts, setCounts] = useState(null)
  const [blockNumber, setBlockNumber] = useState(null)
  const [source, setSource] = useState({})
  const GetBlockEffect = (setCounts) => {
    const [intervalId, setIntervalId] = useState();
    useEffect(() => {
      if(!blockInfos.length) {
        initBlock(setCounts)
      }
      const id = setInterval(getLatestBlocks, 18500, setCounts);
      setIntervalId(id);
      return () => clearInterval(id);
    }, []);
    return () => clearInterval(intervalId);
  };
  
  GetBlockEffect(setCounts, counts)
  console.log('counts', counts)

  let blockInfos = [];

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

  const renderSource = (_source) => {
    const bb = []
    for(let i in _source) {
      // debugger
      console.log('SOURCE_ADDRESSES[i]!!',SOURCE_ADDRESSES[i])
      bb.push({
        name: SOURCE_ADDRESSES[i],
        count: _source[i]
      })
    }
    return <div>{bb.map(x=><div key={x.name}>{`${x.name}: ${x.count}`}</div>)}</div>
  }

const initBlock = async() => {
  const blockNumber = await web3.eth.getBlockNumber();
  setBlockNumber(blockNumber)
  let blockInfo
  for (var i = 0; i < TOTAL_BLOCK; i++) {
    blockInfo = await web3.eth.getBlock(blockNumber - i);
    blockInfos.push(blockInfo);
    
  }
  sortingToAddresses(blockInfo)
  // getLatestBlocks()
  // console.log('init blockInfos', blockInfos)
}

const getLatestBlocks = async () => {
  const latestBlockNumber = await web3.eth.getBlockNumber();
  setBlockNumber(latestBlockNumber)
  if(blockInfos.length > 0) {
    if(latestBlockNumber === blockInfos[TOTAL_BLOCK-1].number) return 
    const lastBlockNumber = blockInfos[TOTAL_BLOCK-1].number 
    const latestBLock = await web3.eth.getBlock(Number(lastBlockNumber)+1);
    blockInfos.unshift(latestBLock)
    blockInfos.pop()

    sortingToAddresses(blockInfos[blockInfos.length-1])
  }
};

const sortingToAddresses = async(blockInfo) => {
  const transactions = blockInfo.transactions.length > 210 ? blockInfo.transactions.slice(0,210) : blockInfo.transactions

  for(let i of transactions) {
    const transaction = await web3.eth.getTransaction(i)
    if(SOURCE_ADDRESSED_ARRAY.includes(transaction.to)) {
      source[transaction.to] = source[transaction.to]+1 || 0
    }
    if(SOURCE_ADDRESSED_ARRAY.includes(transaction.from)) {
      source[transaction.from] = source[transaction.from]+1 || 0
    }
  }

  setCounts(source)
  console.log('source', source)
}


  
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
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
        </a> */}
        <div>{`BlockNumber: ${blockNumber}`}</div>

        <div>{renderSource(counts)}</div>
      </header>
    </div>
  );
}

export default App;
