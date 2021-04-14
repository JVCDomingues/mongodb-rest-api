const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Project = require('../models/Project');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('user');

    return res.status(200).send({ projects });
  } catch(err) {
    return res.status(404).send({ error: 'Projects not found' });
  }
});

router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate('user');

    return res.status(200).send({ project });
  } catch(err) {
    return res.status(404).send({ error: 'Project not found' });
  }
});

router.get('/userId', async (req, res) => {
  try {
    const projects = await Project.find(req.params.userId);

    res.status(200).send({ projects });
  } catch(err) {
    res.status(404).send({ error: `Projects for user ${req.params.userId} not found` });
  }
})

router.post('/', async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.userId });

    res.status(201).send({ project });
  } catch(err) {
    return res.status(400).send({ error: 'Could not create a new project' });
  }

});

router.put('/:projectId', async (req, res) => {
  res.send({ user: req.userId });
});

router.delete('/:projectId', async (req, res) => {
  try { 
    await Project.findByIdAndRemove(req.params.projectId);

    return res.send();
  } catch(err){
    res.status(400).send({ error: `Could not delete project with ID ${req.params.projectId} ` })
  }
});

module.exports = app => app.use('/projects', router);