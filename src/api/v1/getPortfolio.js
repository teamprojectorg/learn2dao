


import {CONFIG} from '../../config.js'
import axios from 'axios';


export default async function getPortfolio(key,chainId,address){
    //Given chain_id and wallet address, return wallet value for the last 30 days at 24 hour timestamps.
    // input: 
    // key: Covalent API key
    // chainId: the Chain the DAO is hosted on (Ethereum, Solana, etc..)
    // address: the smart contract address of the DAO 
  
    // output:
    // total_portfolio_in_dollar: total Portfolio of the DAO in dollar


    let api_call_portfolio =`https://api.covalenthq.com/v1/` +
    `${chainId}/address/${address}/portfolio_v2/?&key=${key}`

    
    let test= `https://api.covalenthq.com/v1/1/address/demo.eth/portfolio_v2/?key=ckey_af1d8bda66e340bd835f1855487`

    try{
        console.log("Here is portfolio in $")
        const resp = await axios.get(test, {auth: {username: key}})
        console.log(resp)
        // Organize response data to insert into graph
        //let date_to_blockheight = resp.data.data.items.map(i => ({x:i., y:i.floor_price_quote_7d})).reverse()
    
        let tokens_balances = resp.data.data.items.map(i => ({x:i.quote}))
        let total_portfolio_in_dollar= tokens_balances.reduce((partialSum, a) => partialSum + a, 0);
       
        return total_portfolio_in_dollar

       }catch(error){
          console.log("fail to fetch portfolio")
      }
  }