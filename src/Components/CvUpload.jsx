import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/cvUpload.css";
import { Send } from 'lucide-react';


const UploadedCv = () => {
  const [file, setFile] = useState(null);
  const [profession, setProfession] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Yalnız PDF, DOC və DOCX formatlı CV yükləyə bilərsiniz!");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    // Login yoxlaması
    const user = localStorage.getItem("currentUser");
    if (!user) {
      setShowLoginWarning(true);
      setTimeout(() => setShowLoginWarning(false), 5000);
      return;
    }

    if (!file || !profession) return;

    const userData = JSON.parse(user);

    const cvData = {
      name: `${userData.name} ${userData.surname}`,
      profession,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      email: userData.email,
      uploadDate: new Date().toISOString(),
    };
    
    const existingCVs = JSON.parse(localStorage.getItem("cvList")) || [];
    existingCVs.push(cvData);
    localStorage.setItem("cvList", JSON.stringify(existingCVs));

    setFile(null);
    setProfession("");

    alert("CV uğurla yükləndi!");
    navigate("/cv-page");
  };

  return (
    <div className="cv-upload-page">
      <div className="cv-upload-container">
        <h2>CV Yüklə</h2>

        <input
          type="text"
          placeholder="Axtardığınız iş / İxtisas"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="input-field"
        />

        <div
          className="drop-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {file ? (
            <p className="file-name">📄 {file.name}</p>
          ) : (
            <p>CV-ni buraya sürüklə və ya klik et</p>
          )}
        </div>

        <input
          id="fileInput"
          type="file"
          hidden
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <button
          disabled={!file || !profession}
          onClick={handleSubmit}
          className="submit-btn"
        >
             <Send />  Göndər
        </button>

        {showLoginWarning && (
          <div className="login-warning">
            ⚠️ CV göndərmək üçün əvvəlcə daxil olmalısınız!
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadedCv;