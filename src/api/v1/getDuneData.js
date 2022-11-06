import { Headers } from 'node-fetch';
import fetch from 'node-fetch';
import storeIPFS from '../../utils/storeIPFS.js';
import retrieveIPFS from '../../utils/retrieveIPFS.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const delay = ms => new Promise(res => setTimeout(res, ms));

async function getStatus(id) {

    const meta = {
        "x-dune-api-key": "QulCZiSlnFuOmMzmB3evwLYeqvoF4UKx"
    };
    
    const header = new Headers(meta);

    // Get Status 
    const response_status = await fetch('https://api.dune.com/api/v1/execution/' + id + '/status',{
        method: 'GET',
        headers: header
    })

    const res  = await response_status.json();
    console.log("Steo2 completed. The state of execution is",res.state)

   // console.log("The Query with Id", res.execution_id, "The Query State is ", res.state.text());
    return res.state.toString()
}

export default async function useDuneApi (query_id, params, file_name) {  

const meta = {
    "x-dune-api-key": "QulCZiSlnFuOmMzmB3evwLYeqvoF4UKx"
};
const header = new Headers(meta);
var body = JSON.stringify(params);

// Step1: Call the Dune API to get the execution_id and enter the execution queue 
const response = await fetch('https://api.dune.com/api/v1/query/' + query_id + '/execute', {
    method: 'POST',
    headers: header,
    body: body // This is where we pass the parameters
});

const response_object = await response.json();
const id = response_object.execution_id;
console.log("Step1 completed. The Execution ID is", id);

//Step2: Get execution status from the exeution_id
// TODO: Need to implement the logic to check when the state will become from 
// "QUERY_STATE_EXECUTING" to "QUERY_STATE_COMPLETED"
let current_status = getStatus(id);

await delay(100000);

// Step 3: Get the response 
const response_2 = await fetch('https://api.dune.com/api/v1/execution/' + id + '/results',{
    method: 'GET',
    headers: header
    })

const r2 = await response_2.json();
console.log(r2.result);


// Step 4: Store the data into IPFS

// Step 5: Retrieve the data from IPFS 

var json = JSON.stringify(r2.result);
console.log("Storing to IPFS")
storeIPFS(json);

const fs = require('fs');

// write JSON string to a file stored locally
let name = file_name + ".json";
fs.writeFile(name, json, err => {
    if (err) {
      throw err
    }
    console.log('JSON data is saved.')
  })

const CID = storeIPFS(r2.result);

// console.log("lets check chether the store/retrieve work ")
// ipfs  = retrieveIPFS(CID)
// console.log(result)
// console.log(ipfs)

}


// List of Metrics to be Displayed 
// Metrics: 1 Display 6 month Gini Coefficient for a DAO address 
// const query_Gini_id = '85676'
// var params_gini_1 = { "query_parameters" : {
//     "1. Contract Address 1":"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
//     "2. period 1": "6 month",
//     "3. min_amount 1":"1",
//     "4. decimals 1":"3"
// }}

// useDuneApi(query_Gini_id, params_gini_1, "gini_coeff_6_months_Uniswap");

// var params_gini_2 = { "query_parameters" : {
//     "1. Contract Address 1":"0x4d224452801ACEd8B2F0aebE155379bb5D594381",
//     "2. period 1": "6 month",
//     "3. min_amount 1":"1",
//     "4. decimals 1":"3"
// }}
// useDuneApi(query_Gini_id, params_gini_2, "gini_coeff_6_months_APECOIN");

// var params_gini_3 = { "query_parameters" : {
//     "1. Contract Address 1":"0x6810e776880C02933D47DB1b9fc05908e5386b96",
//     "2. period 1": "6 month",
//     "3. min_amount 1":"1",
//     "4. decimals 1":"3"
// }}
// useDuneApi(query_Gini_id, params_gini_3, "gini_coeff_6_months_Gnosis");

// Metric 2: Holders over Time 
const query2_id = '15304';
var params_tokenHolders_1 = { "query_parameters" : {
    "Token Address":"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
}}
var params_tokenHolders_2 = { "query_parameters" : {
    "Token Address":"0x4d224452801ACEd8B2F0aebE155379bb5D594381",
}}
var params_tokenHolders_3 = { "query_parameters" : {
    "Token Address":"0x6810e776880C02933D47DB1b9fc05908e5386b96",
}}

useDuneApi(query2_id, params_tokenHolders_1, "holders_over_time_Uniswap");
// useDuneApi(query2_id, params_tokenHolders_2, "holders_over_time_ApeCoin");
// useDuneApi(query2_id, params_tokenHolders_3, "holders_over_time_Gnosis");







