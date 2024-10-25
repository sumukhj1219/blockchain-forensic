'use client'
import axios from 'axios'
import React, { useState } from 'react'

const page = () => {
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState([])
  async function onClick(){
    try {
        const response = await axios.get(`https://api.etherscan.io/api
            ?module=account
            &action=tokentx
            &address=${address}
            &page=1
            &offset=100
            &startblock=0
            &endblock=27025780
            &sort=asc
            &apikey=YourApiKeyToken`)
            setDetails(response.data.result)
        
    } catch (error) {
        console.log('Error occured while fetching')
    }
    
  }
  return (
    <div>
    <input onChange={(e)=>setAddress(e.target.value)} />
      <button onClick={onClick}>
        Monitor Transactions
      </button>
      {details.map((trx,index)=>(
        <div key={index}>
            <p>Token: {trx.token}</p>
        </div>
      ))}
    </div>
  )
}

export default page
