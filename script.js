// get a new date (locale machine date time)
var date = new Date();
// get the date as a string
var n = date.toDateString();
// get the time as a string
var time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

// find the html element with the id of time
// set the innerHTML of that element to the date a space the time
document.getElementById("date").innerHTML = n;
document.getElementById("time").innerHTML = time

// Quote Script
const text = document.getElementById("quotation");
const author = document.getElementById("author");
console.log(text.innerHTML)
const getNewQuote = async () =>
{
    //api for quotes
    var url="https://type.fit/api/quotes";    

    // fetch the data from api
    const response=await fetch(url);
    console.log(typeof response);
    //convert response to json and store it in quotes array
    const allQuotes = await response.json();

    // Generates a random number between 0 and the length of the quotes array
    const indx = Math.floor(Math.random()*allQuotes.length);

    //Store the quote present at the randomly generated index
    const quote=allQuotes[indx].text;

    //Store the author of the respective quote
    const auth=allQuotes[indx].author;

    if(auth==null)
    {
      author = "Anonymous";
    }

    //function to dynamically display the quote and the author
    text.innerHTML= '"' + quote + '"';
    author.innerHTML= "- "+auth;
}

function weatherBalloon(latitude,longitude) {
  var key = '42a3911f7886a69c0db0ac4ab10fd8d1';
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
		drawWeather(data); // Call drawWeather
  })
  .catch(function() {
    // catch any errors
  });
}

 window.onload = function() {
  getNewQuote();
  let lat = 38.5449, lon = 121.7405;
  if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude, lon = position.coords.longitude;
  });
  } else {
  alert("Sorry, your browser does not support HTML5 geolocation.");
  }
  weatherBalloon(lat,lon);
}

function drawWeather(d) {
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	document.getElementById('temp').innerHTML = fahrenheit + '&deg;' + 'F';
}
