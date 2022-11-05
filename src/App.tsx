import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import PaddedLayout from "./components/PaddedLayout";
import getTokenHolders from './api/v1/getTokenHolders';
const App = () => {

  getTokenHolders()
  
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
