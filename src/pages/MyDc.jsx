import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/myDocuments.css";
import { FolderOpen } from 'lucide-react';
import { Trash } from 'lucide-react';
import { File } from 'lucide-react';
import { History } from 'lucide-react';



const MyDocuments = () => {
  const [myCVs, setMyCVs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      alert("Bu səhifəyə daxil olmaq üçün login olmalısınız!");
      navigate("/");
      return;
    }

    const userData = JSON.parse(user);
    setCurrentUser(userData);

    loadMyCVs(userData.email);
  }, [navigate]);

  const loadMyCVs = (userEmail) => {
    const allCVs = JSON.parse(localStorage.getItem("cvList")) || [];
    const userCVs = allCVs.filter(cv => cv.email === userEmail);
    setMyCVs(userCVs);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Bu CV-ni silmək istədiyinizdən əminsiniz?")) {
      return;
    }

    const allCVs = JSON.parse(localStorage.getItem("cvList")) || [];

    const cvToDelete = myCVs[index];

    const updatedAllCVs = allCVs.filter(cv => {
      return !(cv.email === cvToDelete.email &&
        cv.fileName === cvToDelete.fileName &&
        cv.uploadDate === cvToDelete.uploadDate);
    });

    localStorage.setItem("cvList", JSON.stringify(updatedAllCVs));

    loadMyCVs(currentUser.email);

  };

  const handleView = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="documents-page">
      <div className="documents-wrapper">
        <h2 className="documents-title">Mənim Sənədlərim</h2>
        <p className="user-details">
          İstifadəçi: <strong>{currentUser.name} {currentUser.surname}</strong>
        </p>

        {myCVs.length === 0 ? (
          <div className="no-documents">
            <p className="no-documents-text">Hələ heç bir CV yükləməmisiniz.</p>
            <button onClick={() => navigate("/uploaded")} className="btn-upload">
              CV Yüklə
            </button>
          </div>
        ) : (
          <div className="documents-grid">
            {myCVs.map((cv, index) => (
              <div key={index} className="document-item">
                <div className="document-details">
                  <h3 className="document-profession">{cv.profession}</h3>
                  <p className="document-filename"><File /> {cv.fileName}</p>
                  <p className="document-date">
                    <History />   Yüklənmə tarixi: {new Date(cv.uploadDate).toLocaleDateString("az-AZ")}
                  </p>
                </div>
                <div className="document-buttons">
                  <button
                    onClick={() => handleView(cv.fileUrl)}
                    className="btn-view"
                  >
                    <FolderOpen />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="btn-delete"
                  >
                    <Trash />

                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDocuments;