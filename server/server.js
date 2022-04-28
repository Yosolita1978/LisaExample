const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config()
const fetch = require('node-fetch');
const { auth } = require('express-openid-connect');
const db = require('../server/db/db-connection.js'); 
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
const app = express();


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUERBASEURL
  };

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(auth(config));

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    //console.log(req.oidc.isAuthenticated());
    res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});

//creates an endpoint for the route for the user authenticated
app.get('/api/me', (req, res) => {
    console.log(req.oidc.isAuthenticated());
    if(req.oidc.isAuthenticated()){
        console.log(req.oidc.user);
        res.json(req.oidc.user);
    } else{
        res.status(401).json({error: "Error in the auth0"});
    }
});

app.use(express.static(REACT_BUILD_DIR));

// Create the post request for the Country the user is searching
let country;
app.post("/api/search-country", (req, res) => {
  country = req.body.country;
  res.redirect("/api/holidays");
});

// Make the GET request with the country (that it's the redirect from the post request from the user  -- ssee above)

app.get("/api/holidays", cors(), async (req, res) => {
    country = req.query.country;
    console.log("Line 56", country);
     const url = `https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=${country}&year=2022&type=national`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Line 61 server.js", data);
      res.send(data);
    } catch (err) {
      console.error("Fetch error: ", err);
    }
  });

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});