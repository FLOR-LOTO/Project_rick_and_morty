const users = require("../utils/users");

const login = (req, res) => {
  const { email, password } = req.query;
  const USER = users.find(
    (usuario) =>
      usuario.email === email &&
      usuario.password === password
  );

  if (USER) {
    return res.status(200).json({ access: true });
  } else {
    return res.status(403).json({ error: "Invalid credentials" });
  }
};

module.exports = login;







