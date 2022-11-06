export const CONFIG = {
  TEMPLATE: {
    // 1. Set your NFT collection contract address
    collection_address: '0x9498274b8c82b4a3127d67839f2127f2ae9753f4',

    // 2. Set your blockchain chain ID where your NFT collection contract address is deployed (see below for value options)
    block_chain_id: '137',

    // 3. Set the default title of your dashboard. If found, this template uses the NFT Collection name for the title.
    title: 'My NFT Collection',

    // 4. Set your Covalent API Key
    covalent_api_key: 'ckey_af1d8bda66e340bd835f1855487',

    // 5. (Optional) Display the floor price chart
    timeseries_chart: true,

    // 6. (Optional) Set your banner image
    banner_picture: '',

    // 7. Set Web3Storage API Key
    web3storage_api_key:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMyNTBBRDg5M2I2MUU4NUM4N0NjYTc5QTA0NGQ2N0ExMzc0Njg2QTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjczNDk3MjY1MTcsIm5hbWUiOiJ3ZWIzX3Rva2VuIn0._VCATmFBQPzimFDVS0JzdGvpdcKAhKONEXvyUs4Yalc',
    
    livepeer_key:
    '16a0d4dc-86e9-4af5-91f1-1e0434e713f7',
  },

  // Supported networks - just for your reference
  FILTER_OPTIONS: [
    { name: 'Ethereum', value: 1 },
    { name: 'Polygon', value: 137 },
    { name: 'Avalanche', value: 43114 },
    { name: 'Fantom', value: 250 },
    { name: 'Moonbeam', value: 1284 },
    { name: 'Moonriver', value: 1285 },
    { name: 'Arbitrum', value: 42161 },
    { name: 'Shiden', value: 336 },
  ],
  // Supported timeframes - just for your reference
  GRAPH_OPTIONS: [
    { name: '7 Days', value: 7 },
    { name: '1 Month', value: 30 },
    { name: '3 Month', value: 90 },
    { name: '1 Year', value: 365 },
    { name: 'All time', value: 0 },
  ],

  // DAOS WE CAN USE FOR HACKATHON
  DAOS: [
    { name: 'APECOIN', address: '0x1A4b46696b2bB4794Eb3D4c26f1c55F9170fa4C5'},
    { name: 'Sandbox', address: '0x1A4b46696b2bB4794Eb3D4c26f1c55F9170fa4C5'},
    { name: 'BitDAO', address: '0x1A4b46696b2bB4794Eb3D4c26f1c55F9170fa4C5'},

  ],
};
