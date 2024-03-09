/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import './App.css'
import { Button, TextField } from '@mui/material'
import axios from 'axios';

function App() {
  const [wallet, setWallet] = useState("");
  const [walletInfo, setWalletInfo] = useState({});

  function getWalletInfo() {
    axios.get(`https://blockchain.info/balance?active=${wallet}`)
      .then((data) => {
        setWalletInfo(data);
      });
  }

  function getBalance() {
    if (wallet && typeof walletInfo === 'object' && 'data' in walletInfo) {
      console.log(walletInfo.data);

      const bitcoinValue = (walletInfo.data as any)[wallet].final_balance / 100000000;
      return bitcoinValue.toFixed(8);
    }

    return 0;
  }

  return (<>
    <div>
      <TextField id="outlined-basic" label="Wallet address" variant="outlined"
        value={wallet} onChange={(event) => {
          setWallet(event.target.value)
        }} />

    </div>
    <div className="search-button">
      <Button variant="contained" onClick={() => getWalletInfo()}>Search</Button>
    </div>

    <div className="wallet-info">
      Balance: {getBalance()}
    </div>
  </>
  );
}

export default App
