import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Transaction from './Transaction';

const POLL_INTERVAL_MS = 3000;



const TransactionPool = () => {
    const [pool, setPool] = useState();
    const history = useHistory();

    console.log(pool);

    setInterval(()=>{
        fetch('/api/transaction-pool-map').then(response=> response.json())
        .then(json=>setPool(json));
    }, POLL_INTERVAL_MS);

    const onMineTransactionClick = () =>{
        fetch('/api/mine-transactions').then(response=>{
            if(response.status===200){
                history.push('/blocks')
            }
        })
    }

    return <div>
        {!pool && <p>Loading</p>}
        {pool && Object.values(pool).map(transaction=><Transaction key={transaction.id} transaction={transaction}/>)}
        <button onClick={onMineTransactionClick}>Mine</button>
    </div>
}

export default TransactionPool