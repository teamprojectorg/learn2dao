import axios from 'axios';
import { CONFIG } from '../../config.js';

export default async function getSpotPrice(chainId, address, startDate, endDate, apiKey) {
  // Return the spot price of the DAO token from startDate to endDate
  // input:
  // key: Covalent API key
  // chainId: the Chain the DAO is hosted on (Ethereum, Solana, etc..)
  // address: the smart contract address of the DAO
  // startDate
  // endDate

  // output:
  // dates_to_spotPrices: {'2022-10-01':1.2, '2022-10-02':1.4}

  let api_spot_price = `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainId}/USD/${address}/?quote-currency=USD&format=JSON&from=${startDate}&to=${endDate}&key=${apiKey}`;

  try {
    const resp = await axios.get(test, { auth: { username: CONFIG.TEMPLATE.api_key } });

    console.log('huh', resp);

    var dates_to_spotPrices = new Array();
    dates_to_spotPrices['2022-10-01'] = 1.2;
    dates_to_spotPrices['2022-10-02'] = 1.2;
    dates_to_spotPrices['2022-10-03'] = 1.2;
    dates_to_spotPrices['2022-10-04'] = 1.2;

    return dates_to_spotPrices;
  } catch (error) {
    console.log('fail to fetch');
  }
}
