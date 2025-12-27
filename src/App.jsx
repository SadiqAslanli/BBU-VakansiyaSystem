import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadedCv from "./pages/UploadedCv";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import  CvPage  from "./pages/CvPage.jsx";
import MyDc from "./pages/MyDc.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/uploaded" element={<UploadedCv />} />
            <Route path="/cv-page" element={<CvPage />} />
            <Route path="/mydocument" element={<MyDc />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
