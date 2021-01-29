const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = 8000;
const MOVIEDEX = ('./moviedex')

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());







app.listen( PORT, () => {
console.log(`Server is running at http://localhost:${PORT}`)
})