import React, { useEffect, useState } from 'react';
import Block from './Block';
import Transaction from './Transaction';

const Blocks = () =>{
    const [blocks, setBlocks] = useState([]);

    useEffect(()=>{
        fetch('/api/blocks').then((response)=>{
            response.json().then((data)=>{
                console.log(data);
                setBlocks(data);
            })
        })
    },[]);

    return <div className='block-track'>
        {blocks.map((block)=>{
            return<Block  block={block} key={block.hash}/>
        })}
    </div>
}

export default Blocks;