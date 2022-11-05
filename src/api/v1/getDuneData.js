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

export default async function useDuneApi (query_id, params) {  

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

await delay(50000);

// Step 3: Get the response 
const response_2 = await fetch('https://api.dune.com/api/v1/execution/' + id + '/results',{
    method: 'GET',
    headers: header
    })

const r2 = await response_2.json();
console.log(r2.result);


// Step 4: Store the data into IPFS

// Step 5: Retrieve the data from IPFS 

var json = JSON.stringify(response_2);
// console.log("Storing to IPFS")


const fs = require('fs')

// write JSON string to a file
let file_name = "id" + ".json"
fs.writeFile(file_name, json, err => {
    if (err) {
      throw err
    }
    console.log('JSON data is saved.')
  })

// const CID = storeIPFS(r2);

// console.log("lets check chether the store/retrieve work ")
// ipfs  = retrieveIPFS(CID)
// console.log(result)
// console.log(ipfs)

}


// List of Metrics to be Displayed 
// Metrics: 1 Display 6 month Gini Coefficient for a DAO address 
var params_gini = { "query_parameters" : {
    "1. Contract Address 1":"0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    "2. period 1": "6 month",
    "3. min_amount 1":"1",
    "4. decimals 1":"3"
}}
let query1_id = '85676';

useDuneApi(query1_id, params_gini);





