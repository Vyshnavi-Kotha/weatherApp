submit.addEventListener('click', function() {

  var apikey = "T5Ec3evrzFpdlEXfL0YK7qRSjMcmvQrK" // tomorrow.io
  //var apikey = "nK4gKofKQfAIAWuUJmjqL6YoaBLoyl"

  var inputval = document.querySelector('#cityinput')
  var btn = document.querySelector('#submit')
  var city = document.querySelector('#city')

  var currenttemp = document.querySelector('#currenttemp')
  var todayssky = document.querySelector('#todayssky')
  var todaystemp = document.querySelector('#todayshighlow')

  //This is the api link from where all the information will be collected
  fetch('https://api.tomorrow.io/v4/weather/forecast?location='+inputval.value+'&apikey='+apikey)
  .then(res => res.json())
   //.then(data => console.log(data))
  .then(data => {
      
    //display all the information in the webpage.
    city.innerHTML='<span>'+data['location']['name']+'<span>'
    currenttemp.innerHTML= convertTemp(data['timelines']['minutely']['0']['values']['temperature'])
    todayssky.innerHTML = weatherCodeJSON[data['timelines']['minutely']['0']['values']['weatherCode']]
    todaystemp.innerHTML= convertTemp(data['timelines']['daily']['0']['values']['temperatureMin']) + ' -- ' + convertTemp(data['timelines']['daily']['0']['values']['temperatureMax'])

    //Hourly data
    for (i=1;i<6;i++) {
      eval("hour"+i).innerHTML = convertTime(data['timelines']['hourly'][i]['time']) + '<br>' + getWeatherImageTag(data['timelines']['hourly'][i]['values']['weatherCode']) + '<br>' + convertTemp(data['timelines']['hourly'][i]['values']['temperature'])
    }
    
    //Daily Data
    for (i=0;i<5;i++) {
      eval("day"+i).innerHTML =  convertDate(data['timelines']['daily'][i]['time'])
      getWeatherImage("img_day"+i,data['timelines']['daily'][i]['values']['weatherCodeMax'])
      eval("temp_day"+i).innerHTML = convertTemp(data['timelines']['daily'][i]['values']['temperatureMin']) + ' -- ' + convertTemp(data['timelines']['daily'][i]['values']['temperatureMax']);
    }
  })
  .catch(err => alert('ooops....! something went wrong. \n\n Error :  ' + err.message))
})


function convertTemp(temp){ 
  return + Math.round(temp) + "<span>&#176</span>"
}

function convertDate(dt){
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  var d = new Date(dt)
  return weekday[d.getDay()]
}

function convertTime(dt) {
  var hour = new Date(dt).getHours()
  return hour%12 + (hour < 12 ? "AM" : "PM");
}

function getWeatherImageTag(weatherCode){
  return '<img src=' + weatherIcons[weatherCode] + '>'
}

function getWeatherImage(control, weatherCode){
  document.querySelector(eval('"#' + control + '"')).src = weatherIcons[weatherCode]
}

//weather codes copied from :- https://docs.tomorrow.io/reference/data-layers-weather-codes 
var weatherCodeJSON = {
  "0": "Unknown",
  "1000": "Clear, Sunny",
  "1100": "Mostly Clear",
  "1101": "Partly Cloudy",
  "1102": "Mostly Cloudy",
  "1001": "Cloudy",
  "2000": "Fog",
  "2100": "Light Fog",
  "4000": "Drizzle",
  "4001": "Rain",
  "4200": "Light Rain",
  "4201": "Heavy Rain",
  "5000": "Snow",
  "5001": "Flurries",
  "5100": "Light Snow",
  "5101": "Heavy Snow",
  "6000": "Freezing Drizzle",
  "6001": "Freezing Rain",
  "6200": "Light Freezing Rain",
  "6201": "Heavy Freezing Rain",
  "7000": "Ice Pellets",
  "7101": "Heavy Ice Pellets",
  "7102": "Light Ice Pellets",
  "8000": "Thunderstorm"
}

const weatherIcons = {
  "1000" : "images\\small\\png\\10000_clear_small@2x.png",
  "1001" : "images\\small\\png\\10010_cloudy_small@2x.png",
  "1100" : "images\\small\\png\\11000_mostly_clear_small@2x.png",
  "1101" : "images\\small\\png\\11010_partly_cloudy_small@2x.png",
  "1102" : "images\\small\\png\\11020_mostly_cloudy_small@2x.png",
  "2000" : "images\\small\\png\\20000_fog_small@2x.png",
  "2100" : "images\\small\\png\\21000_fog_light_small@2x.png",
  "4000" : "images\\small\\png\\40000_drizzle_small@2x.png",
  "4001" : "images\\small\\png\\40010_rain_small@2x.png",
  "4200" : "images\\small\\png\\42000_rain_light_small@2x.png",
  "4201" : "images\\small\\png\\42010_rain_heavy_small@2x.png",
  "5000" : "images\\small\\png\\50000_snow_small@2x.png",
  "5001" : "images\\small\\png\\50010_flurries_small@2x.png",
  "5100" : "images\\small\\png\\51000_snow_light_small@2x.png",
  "5101" : "images\\small\\png\\51010_snow_heavy_small@2x.png",
  "6000" : "images\\small\\png\\60000_freezing_rain_drizzle_small@2x.png",
  "6001" : "images\\small\\png\\60010_freezing_rain_small@2x.png",
  "6200" : "images\\small\\png\\62000_freezing_rain_light_small@2x.png",
  "6201" : "images\\small\\png\\62010_freezing_rain_heavy_small@2x.png",
  "7000" : "images\\small\\png\\70000_ice_pellets_small@2x.png",
  "7101" : "images\\small\\png\\71010_ice_pellets_heavy_small@2x.png",
  "7102" : "images\\small\\png\\71020_ice_pellets_light_small@2x.png",
  "8000" : "images\\small\\png\\80000_tstorm_small@2x.svg"
}