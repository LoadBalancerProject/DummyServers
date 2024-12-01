const express = require('express');
const redis = require('../config/redis'); // Import the Redis module

const router = express.Router();

router.get('', async (req, res) => {
  try {
    const resources = await redis.getAllResources();
    res.json(resources);
  } catch (error) {
    console.error('Error retrieving resources:', error);
    res.status(500).send('Error retrieving resources');
  }
});

router.get('/:userID', async (req, res) => {
  try {
    const resource = await redis.getResourceById(req.params.resourceId);
    if (!resource) {
      return res.status(404).send('Resource not found');
    }
    res.json(resource);
  } catch (error) {
    console.error('Error retrieving resource:', error);
    res.status(500).send('Error retrieving resource');
  }
});


router.post('', async (req, res) => {
  try {
    const newResource = req.body;
    const id = newResource.id || Date.now().toString(); // Generate a unique ID if not provided
    await redis.createResource(id, newResource);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).send('Error creating resource');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedResource = req.body;
    await redis.updateResource(req.params.id, updatedResource);
    res.json({ message: 'Resource updated' });
  } catch (error) {
    console.error('Error updating resource:', error);
    res.status(500).send('Error updating resource');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await redis.deleteResource(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).send('Error deleting resource');
  }
});

module.exports = router;
