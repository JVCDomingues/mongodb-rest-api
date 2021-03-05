const express = require('express');

const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    
    return res.status(200).send(users);
  } catch (error) {
    return res.status(404).send({ error: 'Users not found' });
  }
});

router.get('/email', async(req, res) => {
  const { email } = req.query;

  try {
    const user = await User.find({ email });
    
    if(user.length !== 0) {
      return res.status(200).send(user);
    }

    return res.status(404).send({ error: 'User not found' });
  } catch (err) {
    res.status(404).send({ error: 'User not found' });
  }

  return res.status(200).send('Email found succesfully');
});

module.exports = app => app.use('/users', router);