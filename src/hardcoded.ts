import { keyBy } from "lodash";

export const hardcoded = [
  {
    logoUrl: "/assets/bit-coin.png",
    governanceContractAddress: "0x1A4b46696b2bB4794Eb3D4c26f1c55F9170fa4C5",
    name: "BitDAO",
    tags: [
      { text: "Social Good", color: "green" },
      { text: "Web3 Grants", color: "blue" },
    ],
    about: `BitDAO’s vision is open finance and a decentralized tokenized economy.
    DeFi technology enables unstoppable and permissionless transactions on the blockchain, including trading, lending, and creation of synthetic assets. With no signup process, no middlemen approvals, no middleman execution, DeFi will fundamentally disrupt traditional finance and is likely to become a trillion dollar sector.
    Tokenization has broadened the scope of property rights, and enabled new economic models for DAOs, collectible NFTs, and gaming.`,
    ensAddress: "apecoin.eth",
  },
  {
    logoUrl: "/assets/git-coin.png",
    governanceContractAddress: "0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F",
    name: "GitCoin",
    tags: [
      { text: "Social Good", color: "green" },
      { text: "Web3 Grants", color: "blue" },
    ],
    about: `We’re on a mission to build an internet that is open source, collaborative, and economically empowering.

    We are creating community and infrastructure for Web 3 — a diverse range of tools, technologies, and networks that enable people to work for the open internet.
    
    By funding projects, building community, and making learning resources accessible, we are teaming up to create the digital public infrastructure of tomorrow.`,
    ensAddress: "apecoin.eth",
  },
  {
    logoUrl: "/assets/ape-coin.png",
    governanceContractAddress: "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
    name: "ApeCoin",
    tags: [
      { text: "NFTs", color: "purple" },
      { text: "Social Good", color: "green" },
    ],
    about: `ApeCoin is an ERC-20 governance and utility token for decentralized communities building at the forefront of culture and web3. Yuga Labs, the company behind the Bored Ape Yacht Club ecosystem, is a contributor to the APE ecosystem and is adopting ApeCoin as the primary token for the BAYC ecosystem as well as upcoming metaverse and gaming experiences. APE adoption will be driven largely by communities who are driving culture forward through NFTs, art, gaming, entertainment, community and events. 

    ApeCoin serves several purposes including: 
    
    Governance - allows ApeCoin holders to participate in the ApeCoin DAO 
    
    Unification of Spend - shared and open currency across more NFT native communities 
    
    Access - exclusive games, merch, events, and services 
    
    Incentivization - tool for third-party developers to incorporate APE into their services, games, and other projects`,
    ensAddress: "apecoin.eth",
  },

  {
    logoUrl: "/assets/bunny-dao.png",
    governanceContractAddress: "0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51",
    name: "Bunny",
    tags: [
      { text: "DEFI", color: "purple" },
      { text: "FinTech", color: "green" },
    ],
    about: `Bunny is a Defi Yield Farming Aggregator and Optimizer for the Binance Smart Chain and Polygon.`,
    ensAddress: "apecoin.eth",
  },
  {
    logoUrl: "/assets/dao-square.png",
    governanceContractAddress: "0xbd9908b0cdd50386f92efcc8e1d71766c2782df0",
    name: "DAOSquare",
    tags: [
      { text: "DAO", color: "blue" },
      { text: "Social Good", color: "green" },
    ],
    about: `Youth Explore Web3`,
    ensAddress: "apecoin.eth",
  },
  {
    logoUrl: "/assets/governor-dao.jpeg",
    governanceContractAddress: "0x515d7e9d75e2b76db60f8a051cd890eba23286bc",
    name: "Governor DAO",
    tags: [
      { text: "DAO Tools", color: "blue" },
      { text: "Service", color: "green" },
    ],
    about: `Governor DAO offers DAO governance bootstrapping tools and tutoring, and a biometric Proof-of-Humanity membership registration to facilitate 1person-1vote systems.`,
    ensAddress: "apecoin.eth",
  },
] as const;

export const hardcodedLookup = keyBy(
  hardcoded,
  (h) => h.governanceContractAddress
);
