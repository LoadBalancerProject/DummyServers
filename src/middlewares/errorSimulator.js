// Middleware to simulate random errors based on headers
function errorSimulator(req, res, next) {
    // Check for the custom header
    const errorType = req.headers['x-simulate-error'];
  
    if (errorType) {
      switch (errorType) {
        case '500':
          return res.status(500).json({ error: 'Internal Server Error' });
        case '400':
          return res.status(400).json({ error: 'Bad Request' });
        case '404':
          return res.status(404).json({ error: 'Not Found' });
        case 'random':
          // Randomly throw 500 or 400 errors
          const randomError = Math.random() < 0.5 ? 500 : 400;
          return res.status(randomError).json({ error: `Simulated Error ${randomError}` });
        default:
          // Unrecognized error type, proceed normally
          break;
      }
    }
  
    // If no error simulation header is present, continue to the route
    next();
  }

module.exports = errorSimulator;
