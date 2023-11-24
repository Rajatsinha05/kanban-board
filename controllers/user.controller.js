const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const loginHandler = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signupHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "email already exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    // Generate a JWT token for the newly created user
    const token = generateToken(newUser);

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to generate a JWT token
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1h",
  };

  // Sign the token with a secret key
  const token = jwt.sign(payload, "gurucool", options);

  return token;
};

module.exports = { loginHandler, signupHandler };