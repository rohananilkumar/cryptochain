import React, { useState } from 'react';
import Transaction from './Transaction';

const Block = (props)=>{
    const [displayTransaction, setDisplayTransaction] = useState(false);

    const onTransactionClick = () =>{
        setDisplayTransaction(!displayTransaction)
    }

    return <div className='block'>
                Block
                <div><div className='label'>TimeStamp:</div> {new Date(parseInt(props.block.timeStamp)).toLocaleDateString()}</div>
                <div><div className='label'>LastHash: </div>{props.block.lastHash}</div>
                <div><div className='label'>Hash: </div>{props.block.hash}</div>
                <div><div className='label transactions' onClick={onTransactionClick}>Transactions: </div>
                {displayTransaction && props.block.data.map((transaction)=><Transaction key={transaction.id} transaction={transaction}/>)}
                </div>
                
                <div><div className='label'>Nonce: </div>{props.block.nonce}</div>
                <div><div className='label'>Difficulty: </div>{props.block.difficulty}</div>
            </div>
}

export default Block;