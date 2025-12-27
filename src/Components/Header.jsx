import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Css/header.css";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const userData = { name: user.name, surname: user.surname, email: user.email };
      localStorage.setItem("currentUser", JSON.stringify(userData));
      onLogin(userData);
    } else {
      setError("Email və ya şifrə yanlışdır");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h2 className="auth-title">Daxil Ol</h2>
        <div>
          <div className="auth-input-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-label">Şifrə</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button onClick={handleLogin} className="auth-button">Daxil Ol</button>
        </div>
      </div>
    </div>
  );
};

// Qeydiyyat Komponenti
const RegisterPage = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = () => {
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Şifrələr uyğun gəlmir");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.find(u => u.email === formData.email);

    if (userExists) {
      setError("Bu email artıq qeydiyyatdan keçib");
      return;
    }

    const newUser = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const userData = { name: newUser.name, surname: newUser.surname, email: newUser.email };
    localStorage.setItem("currentUser", JSON.stringify(userData));
    onRegister(userData);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h2 className="auth-title">Qeydiyyat</h2>
        <div>
          <div className="auth-input-group">
            <label className="auth-label">Ad</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-label">Soyad</label>
            <input
              type="text"
              value={formData.surname}
              onChange={(e) => handleChange("surname", e.target.value)}
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-label">Şifrə</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-label">Şifrəni təsdiqlə</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className="auth-input"
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button onClick={handleRegister} className="auth-button">Qeydiyyatdan keç</button>
        </div>
        <p className="auth-link-text">
          Artıq hesabınız var? <span onClick={onSwitchToLogin} className="auth-link">Daxil olun</span>
        </p>
      </div>
    </div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    closeMenu();
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
    closeMenu();
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/"><img src="https://bbu.edu.az/images/30il.png" alt="BBU Logo" /></Link>
            <span className="name">Bakı Biznes Universiteti</span>
          </div>

          <nav className="desktop-nav">
            <Link to="/">Ev</Link>
            <Link to="/uploaded">CV Göndər</Link>
            <Link to="/cv-page">Namizədlər</Link>
            <Link to="/mydocument">Mənim Sənədlərim</Link>
            {currentUser ? (
              <div className="user-info">
                <span className="user-name">{currentUser.name} {currentUser.surname}</span>
                <button onClick={handleLogout} className="logout-btn">Çıxış</button>
              </div>
            ) : (
              <button onClick={() => openAuth("login")} className="login-btn">Daxil ol</button>
            )}
          </nav>

          <div
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <div
        className={`menu-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />
      
      <nav className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <Link to="/" onClick={closeMenu}>Ev</Link>
        <Link to="/uploaded" onClick={closeMenu}>CV Göndər</Link>
        <Link to="/cv-page" onClick={closeMenu}>Namizədlər</Link>
        {currentUser ? (
          <>
            <span className="mobile-user-name">{currentUser.name} {currentUser.surname}</span>
            <button onClick={handleLogout} className="mobile-logout-btn">Çıxış</button>
          </>
        ) : (
          <button onClick={() => openAuth("login")} className="login-btn mobile-btn">Daxil ol</button>
        )}
      </nav>

      {showAuth && (
        <div className="auth-overlay">
          <div onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowAuth(false)} 
              className="auth-close-btn"
              aria-label="Bağla"
            >
              ✕
            </button>
            {authMode === "login" ? (
              <>
                <LoginPage onLogin={handleLogin} />
                <div className="auth-switch-mode">
                  <button 
                    onClick={() => setAuthMode("register")}
                    className="auth-switch-btn"
                  >
                    Hesabınız yoxdur? Qeydiyyatdan keçin
                  </button>
                </div>
              </>
            ) : (
              <RegisterPage 
                onRegister={handleLogin}
                onSwitchToLogin={() => setAuthMode("login")}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;