'use client';
import axios from 'axios';
import React, { FormEvent, useState } from 'react';
export const runtime = 'edge';

const Page = () => {
    const [display, setDisplay] = useState<string>(''); 
        async function onClick(){
            try {
                const response = await axios.post('http://localhost:3000/api/aws-elasticIp', {meaasge:'hello'});
                const { AllocationId, PublicIp } = response.data.message; 
                setDisplay(`Allocation ID: ${AllocationId}, Public IP: ${PublicIp}`); 
            } catch (error) {
                console.error('Error:', error); 
            }
        }
    
    return (
        <div>
        <button onClick={onClick}>Click</button>
            <h1 className='text-white'>{display}</h1> {/* Display the formatted response */}
        </div>
    )
};

export default Page;
