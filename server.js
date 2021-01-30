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

app.get('/movie')

function validateBearerToken(req, res, next) {
  const authToken = req.get("Authorization");
  const apiToken = process.env.API_TOKEN;

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized Request" });
  }
  next();
}




app.listen( PORT, () => {
console.log(`Server is running at http://localhost:${PORT}`)
})