import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Css/header.css";

/* ================= LOGIN ================= */
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Email və ya şifrə yanlışdır");
        return;
      }

      localStorage.setItem("token", data.token);
      onLogin(data.user);
    } catch {
      setError("Server xətası");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h2 className="auth-title">Daxil Ol</h2>

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
  );
};

/* ================= REGISTER ================= */
const RegisterPage = ({ onSwitchToLogin }) => {
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

  const handleRegister = async () => {
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Şifrələr uyğun gəlmir");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      onSwitchToLogin();
    } catch {
      setError("Server xətası");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h2 className="auth-title">Qeydiyyat</h2>

        {["name","surname","email","password","confirmPassword"].map((f) => (
          <input
            key={f}
            type={f.includes("password") ? "password" : "text"}
            value={formData[f]}
            onChange={(e) => handleChange(f, e.target.value)}
            className="auth-input"
            placeholder={f}
          />
        ))}

        {error && <p className="auth-error">{error}</p>}
        <button onClick={handleRegister} className="auth-button">
          Qeydiyyatdan keç
        </button>

        <p className="auth-link-text">
          Artıq hesabınız var?{" "}
          <span onClick={onSwitchToLogin} className="auth-link">
            Daxil olun
          </span>
        </p>
      </div>
    </div>
  );
};

/* ================= HEADER ================= */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    if (menuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src="https://bbu.edu.az/images/30il.png" alt="BBU Logo" />
            </Link>
            <span className="name">Bakı Biznes Universiteti</span>
          </div>

          <nav className="desktop-nav">
            <Link to="/">Ev</Link>
            <Link to="/uploaded">CV Göndər</Link>
            <Link to="/cv-page">Namizədlər</Link>
            <Link to="/mydocument">Mənim Sənədlərim</Link>

            {currentUser ? (
              <div className="user-info">
                <span className="user-name">
                  {currentUser.name} {currentUser.surname}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  Çıxış
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="login-btn"
              >
                Daxil ol
              </button>
            )}
          </nav>

          <div
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </div>
        </div>
      </header>

      {showAuth && (
        <div className="auth-overlay">
          <button
            className="auth-close-btn"
            onClick={() => setShowAuth(false)}
          >
            ✕
          </button>

          {authMode === "login" ? (
            <>
              <LoginPage onLogin={handleLogin} />
              <button
                className="auth-switch-btn"
                onClick={() => setAuthMode("register")}
              >
                Hesabınız yoxdur? Qeydiyyat
              </button>
            </>
          ) : (
            <RegisterPage onSwitchToLogin={() => setAuthMode("login")} />
          )}
        </div>
      )}
    </>
  );
};

export default Header;
