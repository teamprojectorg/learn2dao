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
    console.log("Step2 completed. The state of execution is",res.state)

   // console.log("The Query with Id", res.execution_id, "The Query State is ", res.state.text());
    return res.state.toString()
}

async function DuneApi (query_id, params) {  

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

await delay(200000);

// Step 3: Get the response 
const response_2 = await fetch('https://api.dune.com/api/v1/execution/' + id + '/results',{
    method: 'GET',
    headers: header
    })

const r2 = await response_2.json();
console.log(r2.result);


// Step 4: Store the data into IPFS

// Step 5: Retrieve the data from IPFS 

return r2.result;
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
// const query2_id = '15304';
// var params_tokenHolders_1 = { "query_parameters" : {
//     "Token Address":"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
// }}
// var params_tokenHolders_2 = { "query_parameters" : {
//     "Token Address":"0x4d224452801ACEd8B2F0aebE155379bb5D594381",
// }}
// var params_tokenHolders_3 = { "query_parameters" : {
//     "Token Address":"0x6810e776880C02933D47DB1b9fc05908e5386b96",
// }}

// useDuneApi(query2_id, params_tokenHolders_1, "holders_over_time_Uniswap"); not donw
//useDuneApi(query2_id, params_tokenHolders_2, "holders_over_time_ApeCoin");
// useDuneApi(query2_id, params_tokenHolders_3, "holders_over_time_Gnosis");


// output: {
//     smart_contract_address: cid
// }


// input: a list of smartcontract address 
//[gitcoin, apecoin,bitdao]
let daos = ["0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F",
"0x4d224452801ACEd8B2F0aebE155379bb5D594381",
"0x1A4b46696b2bB4794Eb3D4c26f1c55F9170fa4C5"]



export default async function store (addresses) {
    let id = 1;
    const map1 = new Map();

    for (const address of addresses) {
        
        //Metrics 1:  Display 6 month Gini Coefficient for a DAO address 
        const query_1 = '85676';
        var params_1 = { "query_parameters" : {
                "1. Contract Address 1":address,
                "2. period 1": "6 month",
                "3. min_amount 1":"1",
                "4. decimals 1":"3"
            }}

        const query_2 = '15304';
        var params_2 = { "query_parameters" : {
            "Token Address":address,
        }}

        const result_1 = await DuneApi(query_1, params_1);
        const result_2 = await DuneApi(query_2, params_2);
      

        let results = JSON.stringify([result_1, result_2]);
        const fs = require('fs');
        let name = id.toString() + ".json"
        fs.writeFile(name, results, err => {
                if (err) {
                  throw err
                }
                console.log('JSON data is saved.')
              })

        map1.set(address, storeIPFS(results))
    var body = JSON.stringify(map1);
    fs.writeFile("check2", body, err => {
            if (err) {
              throw err
            }
            console.log('JSON data 2 is saved.')
          })
}
}


store(daos);



