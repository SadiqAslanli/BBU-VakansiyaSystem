const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "SUPER_SECRET_KEY";

// test üçün fake DB (sonra MongoDB/MySQL olar)
let users = [];

/* REGISTER */
app.post("/api/register", async (req, res) => {
  const { name, surname, email, password } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "Bu email artıq var" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    surname,
    email,
    password: hashedPassword
  };

  users.push(newUser);

  res.json({ message: "Qeydiyyat uğurludur" });
});

/* LOGIN */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Email və ya şifrə yanlışdır" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Email və ya şifrə yanlışdır" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      name: user.name,
      surname: user.surname,
      email: user.email
    }
  });
});

app.listen(5000, () => {
  console.log("Backend işləyir: http://localhost:5000");
});
