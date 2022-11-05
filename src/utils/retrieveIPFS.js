import { Web3Storage } from "web3.storage";
import { CONFIG } from "../config.js";

function getAccessToken() {
  return CONFIG.TEMPLATE.web3storage_api_key;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export default async function retrieveIPFS(cid) {
  const client = makeStorageClient();
  let id = "bafybeiei3sdsoeyqtdxpy5jnmk77yrlbtwvbxatpk23iopz5iegybbzvbi";
  const res = await client.get(id);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);

  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  // unpack File objects from the response
  const files = await res.files();
  var daos_data = "";

  for (const file of files) {
    console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
    // Not too sure how to convert a web file back to a json file here
    console.log(JSON.stringify(file, null, 2));
    await fetch(`https://dweb.link/ipfs/${file.cid}`)
      .then((response) => response.json())
      .then((data) => {
        daos_data = data;
      });
  }
  return daos_data;
}
