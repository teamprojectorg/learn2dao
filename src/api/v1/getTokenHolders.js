import moment from 'moment';
import axios from 'axios';

export default async function getTokenHolders(key, chainId, address, startDate, endDate) {
  // Return the spot price of the DAO token from startDate to endDate
  // input:
  // key: Covalent API key
  // chainId: the Chain the DAO is hosted on (Ethereum, Solana, etc..)
  // address: the smart contract address of the DAO
  // startDate
  // endDate

  // output:
  // totalTokenHolders: Array of date to tokenholders in past 30 days
  // {'2022-10-01':10003, '2022-10-02':100023}

  const days_interval = 30;
  let from = moment().subtract(days_interval, 'days').format('YYYY-MM-DD');

  const currentDay = moment().format('YYYY-MM-DD');

  // Steps to get tokenholders in the past 7 days
  // 1. Get block heights  start_date and end_date 2022-10-01 and 2022-10-31
  // 2. Take the tokenholders of the start_date block height and of the end_date blockholder
  // 3 . plot the data
  let api_call_blockheights = `https://api.covalenthq.com/v1/${chainId}/block_v2/${startDate}/${endDate}/?quote-currency=USD&format=JSON&key=ckey_af1d8bda66e340bd835f1855487`;

  https://api.covalenthq.com/v1/:chain_id/tokens/:address/token_holders_changes/?&key=ckey_af1d8bda66e340bd835f1855487

  try {
    const resp = await axios.get(api_call_blockheights, { auth: { username: key } });
    console.log(resp);
    // Organize response data to insert into graph
    //let date_to_blockheight = resp.data.data.items.map(i => ({x:i., y:i.floor_price_quote_7d})).reverse()

    let date_to_blockheight = resp.data.data.items.map(i => ({ x: i.signed_at, y: i.height }));
    let start_date_block_height = date_to_blockheight[0];
    let end_date_block_height = date_to_blockheight[-1];

    var dates_to_tokenHolders = new Array();
    dates_to_tokenHolders['2022-10-01'] = 100;
    dates_to_tokenHolders['2022-10-02'] = 200;
    dates_to_tokenHolders['2022-10-03'] = 300;
    dates_to_tokenHolders['2022-10-04'] = 400;
    return dates_to_tokenHolders;
  } catch (error) {
    console.log('fail to fetch token holders');
  }
}
