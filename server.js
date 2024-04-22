const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app build directory
app.use(express.static(path.join(__dirname, 'dist', 'plant-detection', 'browser')));

// Handle SPA (Single Page Application) - redirect all routes to index.html
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'plant-detection', 'browser', 'index.html'));
});

// Start the app by listening on the default Heroku port or local
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
