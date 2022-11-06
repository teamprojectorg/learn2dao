import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ConnectExtension } from "@magic-ext/connect";
import { Magic } from "magic-sdk";
import Web3 from "Web3";
import PaddedLayout from "./components/PaddedLayout";
import Home from "./pages/Home";
import Visuals from "./pages/Visuals";

const magic = new Magic("pk_live_73AAE8A5F81B1CF3", {
  network: "goerli",
  locale: "en_US",
  extensions: [new ConnectExtension()],
} as any);
const web3 = new Web3((magic as any).rpcProvider);

window.magic = magic;
window.web3 = web3;

const App = () => {
  return (
    <BrowserRouter>
      <PaddedLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info/:id" element={<Visuals />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PaddedLayout>
    </BrowserRouter>
  );
};

export default App;
