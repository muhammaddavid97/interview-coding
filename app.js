const express = require('express');
const bodyParser = require('body-parser');
const empController = require('./src/controller/EmployeeControllers');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/employee', empController);

// Error middleware

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});