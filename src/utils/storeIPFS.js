import { sha256 } from "js-sha256";
import { Web3Storage } from "web3.storage";
import { CONFIG } from "../config.js";
import { File } from 'web3.storage'

function getAccessToken() {
  return CONFIG.TEMPLATE.web3storage_api_key;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export default async function storeIPFS (json_content) {

  const storage = new Web3Storage({ token: getAccessToken() });
  const finalContent = JSON.stringify(json_content);
  const file = new File([finalContent], sha256(finalContent), {
    type: "application/json",
  });
  const cid = await storage.put([file]);
  console.log(`IPFS CID: ${cid}`);
  console.log(`Gateway URL: https://dweb.link/ipfs/${cid}`);
  return cid;
}

