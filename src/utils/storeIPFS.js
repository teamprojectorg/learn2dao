import { sha256 } from "js-sha256";
import { Web3Storage } from "web3.storage";
import { CONFIG } from "../config.js";

function getAccessToken() {
  return CONFIG.TEMPLATE.web3storage_api_key;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export default async function storeIPFS (json_contnet) {
  const content = {
    0: {
      DaoName: "APECOIN",
      chainId: "1",
      address: "0x1A4b46696b2bB4794Eb3D4c26f1c55F9170fa4C5",
      giniCoefficient: 0.87,
      tokenHolders: { "2020-01-10": 20, "2020-01-11": 20 },
    },

    1: {
      daoName: "SANDBOX",
      chainId: "1",
      address: "0x1A4b46696b2bB4794Eb3D4c26f1c55F9170fa4C5",
      giniCoefficient: 0.87,
      tokenHolders: { "2020-01-10": 20, "2020-01-12": 20 },
    },
  };
  const storage = new Web3Storage({ token: getAccessToken() });
  const finalContent = JSON.stringify(json_content);
  const file = new File([finalContent], sha256(finalContent), {
    type: "text/plain",
  });
  const cid = await storage.put([file]);
  console.log(`IPFS CID: ${cid}`);
  console.log(`Gateway URL: https://dweb.link/ipfs/${cid}`);
  return cid;
}
