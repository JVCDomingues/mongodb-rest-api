const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

const projects = [
  {
    id: 1,
    name: 'ReactJS',
    description: 'A JavaScript library for building user interfaces'
  },
  {
    id: 2,
    name: 'React Native',
    description: 'Learn once, write anywhere.'
  },
  {
    id: 3,
    name: 'NodeJS',
    description: 'A JavaScript runtime built on Chrome V8 JavaScript engine.'
  },
  {
    id: 4,
    name: 'MongoDB',
    description: 'A complete data framework'
  },
]

router.get('/', (req, res) => {
  res.json(projects);
});

module.exports = app => app.use('/projects', router);