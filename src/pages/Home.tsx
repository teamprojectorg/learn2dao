import { CryptoLogos } from "@web3uikit/core";
import console from "console";
import moment from "moment";
import { useEffect, useState } from "react";
import getSpotPrice from "../api/v1/getSpotPrices";
import DisplayBox from "../components/DisplayBox";
import AreaGraph from "../components/Graphs/AreaGraph";
import BarGraph from "../components/Graphs/BarGraph";
import LineWithBarGraph from "../components/Graphs/LineWithBarGraph";
import spacedTimestamps from "../components/Graphs/spacedTimestamps";
import { CONFIG } from "../config";
import retrieveFiles from "../utils/retrieveIPFS";
import storeContent from "../utils/storeIPFS";

const Home = () => {
  const [items, setItems] = useState([]);

  // setup for Timeseries graph
  const [graphData, setGraph] = useState([]);
  const [weiData, setWei] = useState([]);
  const [graphErr, setErr] = useState(false);

  //call getData funciton use React Hook
  useEffect(() => {
    handleCollection();
  }, []);

  const handleGraph = async (filter: any) => {
    try {
      // console.log('Hello');

      // when I did start_date = "2022-10-1 and end_date="2022-10-03 the API didn't work
      const start_date = "2021-01-01";
      const end_date = "2021-01-03";
      const UNISWAP_address = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";

      const chainId = "1";
      // getPortfolio(CONFIG.TEMPLATE.api_key, chainId, UNISWAP_address)
      const resp = await getSpotPrice(
        UNISWAP_address,
        start_date,
        end_date,
        CONFIG.TEMPLATE.covalent_api_key
      );

      console.log("ijij", { resp });

      setErr(false);
    } catch (error) {
      setErr(true);
    }
  };

  const handleCollection = async () => {
    let CID = storeContent();
    retrieveFiles(CID);

    // console.log('Successfully retrieve the IPFS DATA');
    let collection = [];
    const blockchain_id = "1";
    const address_id = "0x4d224452801ACEd8B2F0aebE155379bb5D594381";
    try {
      //  const resp= await axios.get(`https://api.covalenthq.com/v1/${blockchain_id}/nft_market/collection/${address_id}/`,{auth: {username: CONFIG.TEMPLATE.api_key}})
    } catch (error) {}

    if (CONFIG.TEMPLATE.timeseries_chart) {
      //call endpoint with 7 day parameters as default for graph
      handleGraph(7);
    }
  };

  const spacedTicks = spacedTimestamps(
    randomData[0].time,
    randomData[randomData.length - 1].time,
    { every: 1, period: "day" }
  );

  return (
    <div style={{ padding: "1rem" }}>
      <DisplayBox $maxWidth="50rem" className="center mb5">
        <h2 style={{ marginTop: "1rem" }}>DAO Visual 1</h2>
        <LineWithBarGraph
          data={randomData}
          height={300}
          line={{ dataKey: "temperature" }}
          bar={{ dataKey: "temperature", size: 30 }}
          xAxis={{
            label: "Time",
            dataKey: "time",
            ticks: spacedTicks,
            formatter: (tick) => moment(tick).format("L"),
          }}
          yAxis={{ label: "Temperature" }}
        />
      </DisplayBox>
      <DisplayBox $maxWidth="50rem" className="center mb5">
        <h2 style={{ marginTop: "1rem" }}>DAO Visual 2</h2>
        <AreaGraph
          data={randomData}
          height={300}
          dataKey="temperature"
          xAxis={{
            label: "Time",
            dataKey: "time",
            ticks: spacedTicks,
            formatter: (tick) => moment(tick).format("L"),
          }}
          yAxis={{ label: "Temperature" }}
        />
      </DisplayBox>
      <DisplayBox $maxWidth="50rem" className="center">
        <h2 style={{ marginTop: "1rem" }}>DAO Visual 2</h2>
        <BarGraph
          data={randomData}
          height={300}
          dataKeys={[{ key: "temperature", fill: "#000" }]}
          xAxis={{
            label: "Time",
            dataKey: "time",
            ticks: spacedTimestamps(
              randomData[0].time,
              randomData[randomData.length - 1].time,
              { every: 5, period: "day" }
            ),
            formatter: (tick) => moment(tick).format("L"),
          }}
          yAxis={{ label: "Temperature" }}
        />
      </DisplayBox>
    </div>
  );
};

const randomData = [
  { time: 1563577200000, temperature: 17.4 },
  { time: 1563580800000, temperature: 17.2 },
  { time: 1563584400000, temperature: 17.11 },
  { time: 1563588000000, temperature: 17.05 },
  { time: 1563591600000, temperature: 16.74 },
  { time: 1563595200000, temperature: 16.45 },
  { time: 1563598800000, temperature: 16.45 },
  { time: 1563602400000, temperature: 17 },
  { time: 1563606000000, temperature: 17.67 },
  { time: 1563609600000, temperature: 18.9 },
  { time: 1563613200000, temperature: 18.76 },
  { time: 1563616800000, temperature: 18.6 },
  { time: 1563620400000, temperature: 19.34 },
  { time: 1563624000000, temperature: 19.88 },
  { time: 1563627600000, temperature: 20.13 },
  { time: 1563631200000, temperature: 21.66 },
  { time: 1563634800000, temperature: 22.5 },
  { time: 1563638400000, temperature: 22.17 },
  { time: 1563642000000, temperature: 21.42 },
  { time: 1563645600000, temperature: 20.8 },
  { time: 1563649200000, temperature: 20.2 },
  { time: 1563652800000, temperature: 19.34 },
  { time: 1563656400000, temperature: 18.56 },
  { time: 1563660000000, temperature: 17.55 },
  { time: 1563663600000, temperature: 16.57 },
  { time: 1563667200000, temperature: 15.69 },
  { time: 1563670800000, temperature: 14.98 },
  { time: 1563674400000, temperature: 14.24 },
  { time: 1563678000000, temperature: 13.63 },
  { time: 1563681600000, temperature: 13.26 },
  { time: 1563685200000, temperature: 13.19 },
  { time: 1563688800000, temperature: 12.97 },
  { time: 1563692400000, temperature: 13.76 },
  { time: 1563696000000, temperature: 14.65 },
  { time: 1563699600000, temperature: 16.58 },
  { time: 1563703200000, temperature: 18.64 },
  { time: 1563706800000, temperature: 20.5 },
  { time: 1563710400000, temperature: 21.36 },
  { time: 1563714000000, temperature: 22.02 },
  { time: 1563717600000, temperature: 22.55 },
  { time: 1563721200000, temperature: 22.64 },
  { time: 1563724800000, temperature: 22.68 },
  { time: 1563728400000, temperature: 22.33 },
  { time: 1563732000000, temperature: 21.88 },
  { time: 1563735600000, temperature: 20.89 },
  { time: 1563739200000, temperature: 19.83 },
  { time: 1563742800000, temperature: 18.73 },
  { time: 1563746400000, temperature: 17.46 },
  { time: 1563750000000, temperature: 16.7 },
  { time: 1563753600000, temperature: 16.06 },
  { time: 1563757200000, temperature: 15.72 },
  { time: 1563760800000, temperature: 15.56 },
  { time: 1563764400000, temperature: 15.5 },
  { time: 1563768000000, temperature: 15.54 },
  { time: 1563771600000, temperature: 15.97 },
  { time: 1563775200000, temperature: 17.01 },
  { time: 1563778800000, temperature: 18.44 },
  { time: 1563782400000, temperature: 20.31 },
  { time: 1563786000000, temperature: 22.01 },
  { time: 1563789600000, temperature: 23.51 },
  { time: 1563793200000, temperature: 24.7 },
  { time: 1563796800000, temperature: 25.55 },
  { time: 1563800400000, temperature: 25.94 },
  { time: 1563804000000, temperature: 26.15 },
  { time: 1563807600000, temperature: 26.32 },
  { time: 1563811200000, temperature: 26.42 },
  { time: 1563814800000, temperature: 26.18 },
  { time: 1563818400000, temperature: 25.46 },
  { time: 1563822000000, temperature: 24.56 },
  { time: 1563825600000, temperature: 23.41 },
  { time: 1563829200000, temperature: 22.39 },
  { time: 1563832800000, temperature: 21.4 },
  { time: 1563836400000, temperature: 20.55 },
  { time: 1563840000000, temperature: 19.77 },
  { time: 1563843600000, temperature: 19.39 },
  { time: 1563847200000, temperature: 19.12 },
  { time: 1563850800000, temperature: 18.84 },
  { time: 1563854400000, temperature: 18.56 },
  { time: 1563858000000, temperature: 18.45 },
  { time: 1563861600000, temperature: 19.13 },
  { time: 1563865200000, temperature: 20.31 },
  { time: 1563868800000, temperature: 21.73 },
  { time: 1563872400000, temperature: 23.48 },
  { time: 1563876000000, temperature: 25.51 },
  { time: 1563879600000, temperature: 27.75 },
  { time: 1563883200000, temperature: 29.89 },
  { time: 1563886800000, temperature: 30.92 },
  { time: 1563890400000, temperature: 31.22 },
  { time: 1563894000000, temperature: 31.36 },
  { time: 1563897600000, temperature: 30.48 },
  { time: 1563901200000, temperature: 28.86 },
  { time: 1563904800000, temperature: 27.08 },
  { time: 1563908400000, temperature: 25.18 },
  { time: 1563912000000, temperature: 23.86 },
  { time: 1563915600000, temperature: 22.82 },
  { time: 1563919200000, temperature: 22.05 },
  { time: 1563922800000, temperature: 21.68 },
  { time: 1563926400000, temperature: 21.6 },
  { time: 1563930000000, temperature: 23.82 },
  { time: 1563933600000, temperature: 23.69 },
  { time: 1563937200000, temperature: 23.05 },
  { time: 1563940800000, temperature: 22.52 },
  { time: 1563944400000, temperature: 21.79 },
  { time: 1563948000000, temperature: 21.64 },
  { time: 1563951600000, temperature: 22.27 },
  { time: 1563955200000, temperature: 23.84 },
  { time: 1563958800000, temperature: 25.39 },
  { time: 1563962400000, temperature: 26.33 },
  { time: 1563966000000, temperature: 27.33 },
  { time: 1563969600000, temperature: 28.16 },
  { time: 1563973200000, temperature: 28.91 },
  { time: 1563976800000, temperature: 29.26 },
  { time: 1563980400000, temperature: 29.15 },
  { time: 1563984000000, temperature: 28.65 },
  { time: 1563987600000, temperature: 28.09 },
  { time: 1563991200000, temperature: 27.49 },
  { time: 1563994800000, temperature: 26.64 },
  { time: 1563998400000, temperature: 26.07 },
  { time: 1564002000000, temperature: 25.6 },
  { time: 1564005600000, temperature: 24.91 },
  { time: 1564009200000, temperature: 24.2 },
  { time: 1564012800000, temperature: 24.07 },
  { time: 1564016400000, temperature: 23.44 },
  { time: 1564020000000, temperature: 22.59 },
  { time: 1564023600000, temperature: 21.33 },
  { time: 1564027200000, temperature: 20.25 },
  { time: 1564030800000, temperature: 20 },
  { time: 1564034400000, temperature: 21.14 },
  { time: 1564038000000, temperature: 23.06 },
  { time: 1564041600000, temperature: 25.91 },
  { time: 1564045200000, temperature: 28.79 },
  { time: 1564048800000, temperature: 30.95 },
  { time: 1564052400000, temperature: 32.55 },
  { time: 1564056000000, temperature: 34.24 },
  { time: 1564059600000, temperature: 35.27 },
  { time: 1564063200000, temperature: 35.85 },
  { time: 1564066800000, temperature: 36.24 },
  { time: 1564070400000, temperature: 35.62 },
  { time: 1564074000000, temperature: 35.27 },
  { time: 1564077600000, temperature: 34.62 },
  { time: 1564081200000, temperature: 32.27 },
  { time: 1564084800000, temperature: 29.43 },
  { time: 1564088400000, temperature: 29.04 },
  { time: 1564092000000, temperature: 28.02 },
  { time: 1564095600000, temperature: 27.01 },
  { time: 1564099200000, temperature: 24.59 },
  { time: 1564102800000, temperature: 23.12 },
  { time: 1564106400000, temperature: 22.08 },
  { time: 1564110000000, temperature: 21.33 },
  { time: 1564113600000, temperature: 20.48 },
  { time: 1564117200000, temperature: 19.86 },
  { time: 1564120800000, temperature: 20.01 },
  { time: 1564124400000, temperature: 20.87 },
  { time: 1564128000000, temperature: 21.87 },
  { time: 1564131600000, temperature: 22.9 },
  { time: 1564135200000, temperature: 23.7 },
  { time: 1564138800000, temperature: 24.23 },
  { time: 1564142400000, temperature: 24.35 },
  { time: 1564146000000, temperature: 24.67 },
  { time: 1564149600000, temperature: 25.04 },
  { time: 1564153200000, temperature: 25.44 },
  { time: 1564156800000, temperature: 25.54 },
  { time: 1564160400000, temperature: 24.49 },
  { time: 1564164000000, temperature: 21.31 },
  { time: 1564167600000, temperature: 21.35 },
  { time: 1564171200000, temperature: 21.46 },
  { time: 1564174800000, temperature: 20.63 },
  { time: 1564178400000, temperature: 19.44 },
  { time: 1564182000000, temperature: 19.19 },
  { time: 1564185600000, temperature: 18.57 },
  { time: 1564189200000, temperature: 17.91 },
  { time: 1564192800000, temperature: 16.93 },
  { time: 1564196400000, temperature: 16.42 },
  { time: 1564200000000, temperature: 16.01 },
  { time: 1564203600000, temperature: 15.93 },
  { time: 1564207200000, temperature: 16.44 },
  { time: 1564210800000, temperature: 16.88 },
  { time: 1564214400000, temperature: 17.52 },
  { time: 1564218000000, temperature: 18 },
  { time: 1564221600000, temperature: 18.56 },
  { time: 1564225200000, temperature: 19.03 },
  { time: 1564228800000, temperature: 20.36 },
  { time: 1564232400000, temperature: 20.48 },
  { time: 1564236000000, temperature: 20.79 },
  { time: 1564239600000, temperature: 20.48 },
  { time: 1564243200000, temperature: 21.12 },
  { time: 1564246800000, temperature: 21.52 },
  { time: 1564250400000, temperature: 21.18 },
  { time: 1564254000000, temperature: 20.67 },
  { time: 1564257600000, temperature: 19.99 },
  { time: 1564261200000, temperature: 19.33 },
  { time: 1564264800000, temperature: 18.48 },
];

export default Home;
