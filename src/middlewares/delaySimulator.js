// Middleware to introduce a delay based on the 'x-delay' header
function delaySimulator(req, res, next) {
    const delay = parseInt(req.headers['x-delay'], 10);
    
    if (delay && !isNaN(delay) && delay > 0) {
      // Introduce a delay using setTimeout
      setTimeout(() => {
        next();
      }, delay);
    } else {
      next();
    }
  }

module.exports = delaySimulator;
