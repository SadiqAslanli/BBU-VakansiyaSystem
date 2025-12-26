import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import  UploadedCv  from "./pages/UploadedCv";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uploaded" element={<UploadedCv />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
