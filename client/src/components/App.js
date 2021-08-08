import React, {useEffect, useState} from "react";
import Blocks from "./Blocks";
const App = ()=>{
    const [walletInfo, setWalletInfo] = useState({ address:'', balance:0});

    useEffect(()=>{
        fetch('/api/wallet-info').then((response)=>{
            response.json().then((info)=>{
                console.log(info);
                setWalletInfo({
                    address:info.address,
                    balance:info.balance
                })
            })
        });
        
    },[]);

    return <div className='app'>
                <div id='welcome'>
                    Welcome to the blockchain
                </div>
                <div className='wallet-info'>
                    {!walletInfo && <p>Loading...</p>}
                    {walletInfo && <div className='address'>Address: {walletInfo.address}</div>}
                    {walletInfo && <div className='balance'>Balance: {walletInfo.balance}</div>}
                </div>
    </div>
}

export default App;