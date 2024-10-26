'use client'
import React, { useState } from 'react'
import axios from 'axios'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Page = () => {
  const [balance, setBalance] = useState(null)
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState([]) // Set as empty array by default

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
        
        // Ensure `result` is an array
        if (Array.isArray(response.data.result)) {
          setDetails(response.data.result)
        } else {
          console.error('API did not return an array for details')
          setDetails([])
        }
    } catch (error) {
        console.log('Some error occurred while fetching more')
        setBalance('No further History')
    }
  }

  return (
    <div className="flex flex-col items-center px-4 py-8">
      {/* UI code remains the same */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-lg mb-4">
        <Input 
          type="text"
          placeholder="Enter Ethereum address"
          value={address}
          onChange={(e) => setAddress(e.target.value)} 
          className="flex-1 p-2 border rounded"
        />
        <Button onClick={onClick} variant="yellow" className="w-full sm:w-auto">
          Fetch Balance
        </Button>
        <Button onClick={moreDetails} variant="yellow" className="w-full sm:w-auto">
          Get More
        </Button>
      </div>
      
      {balance !== null && (
        <div className="mt-4 font-bold text-xl text-center">
          Balance: {balance} ETH
        </div>
      )}
      <div className="w-full max-w-7xl flex justify-center mt-8">
        <Table className="w-full max-w-7xl overflow-x-auto mx-auto">
          <TableCaption>Wallet Screening</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-blue-700">Block No.</TableHead>
              <TableHead className=' text-blue-700'>From</TableHead>
              <TableHead className=' text-blue-700'>To</TableHead>
              <TableHead className="text-right  text-blue-700">Value (ETH)</TableHead>
              <TableHead className="text-right  text-blue-700">Contract Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {details.map((trx, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{trx.blockNumber}</TableCell>
                <TableCell className="truncate overflow-hidden max-w-xs">{trx.from}</TableCell>
                <TableCell className="truncate overflow-hidden max-w-xs">
                  {trx.to ? (
                    trx.to
                  ) : (
                    <span className="text-red-500 font-bold">Critical (No To Address)</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {parseFloat(trx.value / 1e18).toFixed(4)} ETH
                </TableCell>
                <TableCell className="text-right">{trx.contractAddress || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Page
