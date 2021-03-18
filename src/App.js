import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {GetBlockEffect} from './effects'

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

  const renderSource = (source) => {
    const bb = []
    for(let i in source) {
      // debugger
      console.log('SOURCE_ADDRESSES[i]!!',SOURCE_ADDRESSES[i])
      bb.push({
        name: SOURCE_ADDRESSES[i],
        count: source[i]
      })
    }
    return <div>{bb.map(x=><div key={x.name}>{`${x.name}: ${x.count}`}</div>)}</div>
  }

function App() {
  const [counts, setCounts] = useState(null)
  GetBlockEffect(setCounts, counts)
  console.log('counts', counts)
  
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

        <div>{renderSource(counts)}</div>
      </header>
    </div>
  );
}

export default App;
