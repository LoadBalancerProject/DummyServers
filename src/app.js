const express = require('express');
const app = express();
const errorSimulator = require('./middlewares/errorSimulator');
const delaySimulator = require('./middlewares/delaySimulator');
// Import the routes
const resourcesRoutes = require('./servers/resourcesServer');
const usersRoutes = require('./servers/usersServer');


app.use(errorSimulator);
app.use(delaySimulator);
app.use(express.json());

async function startServer() {
  try {
    // Use the routes with the respective base paths
    app.use('/resources', resourcesRoutes);
    app.use('/users', usersRoutes);

    // Health check endpoint
    app.get('/ping', (req, res) => {
      res.status(200).json({ status: 'UP' });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Clean up resources on exit
    process.on('SIGINT', async () => {
      await disconnectDB();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start the server", error);
  }
}

startServer();