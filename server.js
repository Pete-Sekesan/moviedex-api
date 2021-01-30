const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config(); 

const app = express();
const PORT = 8000;
const MOVIEDEX = ('./moviedex')

app.use(morgan('dev'));
app.use(validateBearerToken);
app.use(cors());
app.use(helmet());

app.get('/movie', handleGetMovie)

function validateBearerToken(req, res, next) {
  const authToken = req.get("Authorization");
  const apiToken = process.env.API_TOKEN;

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized Request" });
  }
  next();
}

function handleGetMovie(req,res) {
  let response = MOVIEDEX;
  //genre query
  if (req.query.genre) {
    response = response.filter((movie) => {
      return movie.genre.toLowerCase().includes(req.query.genre.toLowerCase());
    });
  }

  //country query

  if (req.query.country) {
    response = response.filter((movie) =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }
  
  //average vote query
    
  if (req.query.avg_vote) {
    response = response.filter(
      (movie) => Number(movie.avg_vote) >= Number(req.query.avg_vote)
    );
  }

  res.json(response);
}







app.listen( PORT, () => {
console.log(`Server is running at http://localhost:${PORT}`)
})