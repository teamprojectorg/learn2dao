import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import PaddedLayout from "./components/PaddedLayout";
import getTokenHolders from './api/v1/getTokenHolders';
import Web3 from 'Web3';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import { LivepeerConfig, createReactClient, studioProvider } from "@livepeer/react";
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { WagmiConfig, chain, createClient } from 'wagmi';

const magic = new Magic("pk_live_73AAE8A5F81B1CF3", {
  network: "goerli",
  locale: "en_US",
  extensions: [new ConnectExtension()]
} as any);
const web3 = new Web3(magic.rpcProvider);

window.magic = magic;
window.web3 = web3;

const App = () => {  
  return (
    <BrowserRouter>
      <PaddedLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </PaddedLayout>
    </BrowserRouter>
  );
};

export default App;
