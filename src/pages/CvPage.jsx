import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CvCards from "../Components/CvCards";
import "../Css/cvPage.css";

const CvPage = () => {
  const [cvList, setCvList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCVs = JSON.parse(localStorage.getItem("cvList")) || [];
    setCvList(storedCVs);
  }, []);

  return (
    <div className="cv-list-page">
      <div className="cv-page-header">
        <h2>Yüklənmiş CV-lər</h2>
        <button onClick={() => navigate("/uploaded")} className="back-btn">
          ← Yeni CV əlavə et
        </button>
      </div>
      <CvCards cvs={cvList} />
    </div>
  );
};

export default CvPage;