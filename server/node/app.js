// Packages
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const app = require('express')();
const multer = require('multer');

// Global variables
const SERVER_PORT = process.env.BACKEND_PORT || 8080;
const upload = multer({ dest: 'uploads/' })

// Middleware
app.use(express.json());

// Functions


// Server
app.listen(SERVER_PORT, () => {
    console.log(`Started the server on port: ${SERVER_PORT}`)
})