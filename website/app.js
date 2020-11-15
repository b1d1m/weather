/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&units=metric&appid=33a289cc57cd0fcb3794e23acff93d3d';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', queryWeather);

function queryWeather(e) {
    const zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    getWeather(baseURL,zipCode,apiKey)
    .then (function(data) {
       postWeather('/', {temp: data.main.temp, date: newDate, feeling: feelings} );
    })
    .then (
        updateUI()
    );
};

const getWeather = async (baseURL, zip, apiKey) => {
    const res = await fetch(baseURL+zip+apiKey)
    try{
        const data = res.json();
        return data;
    }catch(error) {
        console.log('error', error);
    }
}

const postWeather = async ( url = '', data = {}) => {
    const response = await fetch(url,  {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data), 
      });

        try {
            const newData = await response.json();
            return newData;
        }catch(error) {
        console.log("error", error);
        }
}

const updateUI = async () => {
    const request = await fetch('/get');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML =  allData.temp;
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('date').innerHTML = allData.date;
    }catch(error) {
        console.log("error", error);
    }
}
