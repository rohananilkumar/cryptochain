import React from 'react';

const Transaction = (props) =>{
    return <div className='transaction'>
        <div>From: {props.transaction.input.address} </div>
        {Object.keys(props.transaction.outputMap)
                .map((key)=>{
                return <div key={key}>
                    {props.transaction.input.address && <div>To {key}; amount= {props.transaction.outputMap[key]}</div>}
                    </div>
                })}
        
    </div>
}

export default Transaction