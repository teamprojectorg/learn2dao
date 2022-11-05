import {CONFIG} from '../../config.js'
import axios from 'axios';


export default async function getGiniCoefficient(key, chainId, address){
  // input: 
  // key: Covalent API key
  // chainId: the Chain the DAO is hosted on (Ethereum, Solana, etc..)
  // address: the smart contract address of the DAO 
  
  // output:
  // coefficient: integer, represents the gini coefficient of the DAO

  // TODO: waiting for Derek to get the calculation steps
  let coefficient = 0.98;
  return coefficient;
}

