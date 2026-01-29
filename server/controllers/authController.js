import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// export const register = async (req, res) => {
//   const user = await User.create(req.body);
//   res.json(user);
// };

export const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save(); // triggers pre-save hook
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // res.json({ token, user });
   res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
