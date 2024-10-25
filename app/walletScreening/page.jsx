'use client'
import React, { useState } from 'react'
import axios from 'axios'

const Page = () => {
  const [balance, setBalance] = useState(null)
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState([])

  async function onClick(e) {
    e.preventDefault()
    try {
      const response = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=WH1IUZ2H14ZSJ6EQHRGQYRUA28EKRMYSIY`)
      const balanceInWei = response.data.result
      const balanceInEther = balanceInWei / 1e18 // Convert from Wei to Ether
      setBalance(balanceInEther)
    } catch (error) {
      console.error("Error fetching balance:", error)
      setBalance("Error fetching balance")
    }
  }

  async function moreDetails(){
    try {
        const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=WH1IUZ2H14ZSJ6EQHRGQYRUA28EKRMYSIY`)
        setDetails(response.data.result)
    } catch (error) {
        console.log('Some error occured while fetching more')
        setBalance('No further History')
    }
  }

  return (
    <div>
      <input 
        type="text"
        placeholder="Enter Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)} 
      />
      <button onClick={onClick}>
        Fetch Account Balance
      </button>
      <button onClick={moreDetails}>
        Get More
      </button>
      <div>
        {balance !== null ? `Balance: ${balance} ETH` : ''}
      </div>
      {details.map((trx, index)=>(
        <div key={index}>
        <p>Block Number: {trx.blockNumber}</p>
        <p>From :{trx.from}</p>
        <p>
                To: 
                {trx.to === "" ? (
                  <span style={{ backgroundColor: "red", color: "white", padding: "2px 6px", borderRadius: "4px", marginLeft: "5px" }}>
                    Critical
                  </span>
                ) : (
                    <div>
                        <p>{trx.to}</p>
                         <span style={{ backgroundColor: "green", color: "white", padding: "2px 6px", borderRadius: "4px", marginLeft: "5px" }}>
                    Verified
                  </span>
                    </div>
                   
                )}
              </p>
        <p>Value: {trx.value / 1e18} ETH</p>
        <p>Contract Adress :{trx.contractAddress}</p>
        </div>
        

      ))}
    </div>
  )
}

export default Page
