const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const dotenv = require('dotenv');
dotenv.config();

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      console.table({ error: 'All input is required' });
      return res.status(400).json({ error: 'All input is required' });
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      console.table({ error: 'User Already Exists. Please Login' });
      return res.status(409).json({ error: 'User Already Exists. Please Login' });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: 'user'
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: '2h' }
    );
    user.token = token;
    console.table({ message: 'User Created Successfully' });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    });
    res.status(201).json(user);
  } catch (error) {
    console.table(error);
    res.status(500).json(error);
    // res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.table({ error: 'All input is required' });
      return res.status(400).json({ error: 'All input is required' });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: '2h' }
      );
      user.token = token;
      console.table({ error: 'Login Successful' });
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000
      });
      res.status(200).json(user);
    } else {
      console.table({ error: 'Invalid Credentials' });
      res.status(400).json({ error: 'Invalid Credentials' });
    }
  } catch (error) {
    console.table(error);
    res.status(500).json(error);
    // res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('token');
    console.table({ message: 'Logout Successful' });
    res.status(200).json({ message: 'Logout Successful' });
  } catch (error) {
    console.table(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.table({ message: 'Users fetched successfully' });
    res.status(200).json(users);
  } catch (error) {
    console.table(error);
    res.status(500).json(error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};

const changeRole = async (req, res) => {
  try {
    const { user_id, new_role } = req.body;
    if (!user_id || !new_role) {
      console.table({ error: "All input is required" });
      return res.status(400).json({ error: "All input is required" });
    }
    const user = await User.findById(user_id);
    if (!user) {
      console.table({ error: "User not found" });
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role === new_role) {
      console.table({ error: "User already has this role" });
      return res.status(400).json({ error: "User already has this role" });
    }
    user.role = new_role;
    await user.save();
    console.table({ error: "Role changed successfully" });
    res.status(200).json(user);
  } catch (error) {
    console.table(error);
    res.status(500).json(error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      userId: user._id,
      username: user.first_name + ' ' + user.last_name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports = { register, login, logout, getUsers, changeRole, getUserProfile};