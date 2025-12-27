import React from "react";
import "../Css/cvCards.css";

const CvCards = ({ cvs }) => {
  return (
    <div className="cv-container">
      {cvs.length === 0 ? (
        <p className="empty-message">Hələ heç bir CV yüklənməyib</p>
      ) : (
        cvs.map((cv, index) => (
          <div className="cv-card" key={index}>
            <div className="cv-name">{cv.name}</div>
            <div className="cv-profession">{cv.profession}</div>
            <div className="cv-file">📎 {cv.fileName}</div>
            <button
              className="cv-view-btn"
              onClick={() => window.open(cv.fileUrl, "_blank")}
            >
              CV-yə bax
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CvCards;