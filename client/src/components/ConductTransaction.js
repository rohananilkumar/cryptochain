import React, { useState } from "react";

const ConductTransaction = () =>{
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState(); 

    const onRecipientChange = (value) =>{
        setRecipient(value.target.value);
    }

    const onAmountChange = (value) =>{
        setAmount(parseInt(value.target.value));
    }

    const onTransactButtonClick = ()=>{
       fetch('/api/transact', {
           method:'POST',
           headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
           body:JSON.stringify({recipient, amount})
       }).then((response)=>{
           console.log(response);
           if(response.status===200){
               alert('Transaction complete');
           }
           else{
               console.error(response.statusCode);
               alert('Input error');
           }

       }).catch(error=>{    
           alert('api error')
       })
    }


    return <div>
        <div className='input-ele'>
            <input type='text' onChange={onRecipientChange}/>
        </div>
        <div className='input-ele'>
            <input type='text' onChange={onAmountChange}/>
        </div>

        <div className='button-ele'>
            <button onClick={onTransactButtonClick}>Transact</button>
        </div>
    </div>
};

export default ConductTransaction;