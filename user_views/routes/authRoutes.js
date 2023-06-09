const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth, authorizeAdmin } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get("/logout", authController.logout);


router.get('/profile', auth, authController.getUserProfile);
router.get('/users', auth, authorizeAdmin, authController.getUsers);
router.post('/change-role', auth, authorizeAdmin, authController.changeRole);

module.exports = router;
