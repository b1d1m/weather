// Setup empty JS object to act as endpoint for all routes
projectData = {};
const express =  require('express');
const bodyParser = require('body-parser');
// Require Express to run server and routes
const app = express();
const PORT = '4040';
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

app.get('/get', function(req, res) {
    res.send(projectData);
})

app.post('/', (req,res) => {
    let data = req.body;
    projectData["temp"] = data.temp;
    projectData["date"] = data.date;
    projectData["feel"] = data.feeling;
    res.send(projectData);
})
// Setup Server
const server = app.listen(PORT, () => { console.log(`Server is working on port: ${PORT} `)});
