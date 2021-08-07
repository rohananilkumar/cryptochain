import React from 'react';

const Transaction = (props) =>{
    return <div className='transaction'>
        <div className='transaction__id'>id:{props.transaction.id}</div>
        <div className='transaction__outputMap'>outputMap:{Object.keys(props.transaction.outputMap).map((key)=><div key={key}>{key}:{props.transaction.outputMap[key]}</div>)}</div>
        <div className='transaction__input'>input:
            <div className='transaction__input__timeStamp'>timeStamp:{props.transaction.input.timeStamp}</div>
            <div className='transaction__input__amount'>Amount:{props.transaction.input.amount}</div>
            <div className='transaction__input__address'>Address:{props.transaction.input.address}</div>
        </div>
    </div>
}

export default Transaction