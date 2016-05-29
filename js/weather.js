const apiKey = '8a5910e9d87b9b06f733d4de4979b649'

// Colors: [bgColor, titleColor, textColor, footerColor]
// let dayColors = ["#00e0ff", "#faff00", "#001dba", "#de6a00"]
let dayColors = ['#080C14', '#AADDDD', '#BBBBCC']
let nightColors = ['#080C14', '#AADDDD', '#BBBBCC']
let d = new Date()
let h = d.getHours()
let timeOfDay = ''

let locationData = {
  'city_name': this.name,
  'country': this.country,
  'temperature': this.temp,
  'weather_conditions': this.conditions,
  'locationIcon': this.icon,
  'conditionID': this.conID
}

// Mouseover function for the F <=> C conversion button
let mo = function (id) {
  $(id).mouseover(function () {
    $(this).css('color', '#FFF')
  })
  $(id).mouseout(function () {
    if (timeOfDay === 'day') { $(this).css('color', dayColors[2]) } else { $(this).css('color', nightColors[2]) }
  })
}

let getConditionID = function (a) {
  return a.list[0].weather[0].id
}

let getWeatherIcon = function (id) {
  let weatherIcons = ['wi-day-sunny', 'wi-night-clear', 'wi-cloudy',
    'wi-raindrops', 'wi-snowflake-cold', 'wi-cloud']
  let icon = 0
  if (id >= 200 && id < 600) { icon = 3 }
  else if (id >= 600 && id < 700) { icon = 4 }
  else if (id === 800 && timeOfDay === 'day') { icon = 0 }
  else if (id === 800 && timeOfDay === 'night') { icon = 1 }
  else if (id > 800 && id < 900) { icon = 2 } else { id = 5 }
  return weatherIcons[icon]
}

let temperatureConversion = function (temp) {
  let newTemp = 0
  if ($('#tempMode').text() === 'F') {
    newTemp = Math.round((temp - 32) * 5 / 9)
    $('#tempMode').html('C')
  } else {
    newTemp = Math.round((temp * 9 / 5) + 32)
    $('#tempMode').html('F')
  }
  return newTemp
}

let getTime = function () {
  if (h < 6 || h >= 19) {
    $('body').css('background-color', nightColors[0])
    $('#title').css('color', nightColors[1])
    $('body').css('color', nightColors[2])
    timeOfDay = 'night'
  } else {
    $('body').css('background-color', dayColors[0])
    $('#title').css('color', dayColors[1])
    $('body').css('color', dayColors[2])
    $('footer a').css('color', dayColors[3])
    timeOfDay = 'day'
  }
}

let updateMessage = function () {
  if (h < 4 || h >= 20) {
    $('#title h1').html("Good night!  Here's the weather:  ")
  } else if (h < 12) {
    $('#title h1').html("Good morning!  Here's the weather:  ")
  } else if (h < 18) {
    $('#title h1').html("Good afternoon!  Here's the weather:  ")
  } else {
    $('#title h1').html("Good evening!  Here's the weather:  ")
  }
}

let updateHTML = function (locationData, a) {
  $('#location').html(locationData.cityName + ', ' + locationData.country)
  $('#conditions').html(locationData.conditions)
  $('#tempNum').html(locationData.temp + ' ')
  locationData.conID = getConditionID(a)
  locationData.conditionIcon = getWeatherIcon(locationData.conID)
  $('#weatherIcon').html('<i class="' + 'wi ' + locationData.conditionIcon + '"></i>')
}

$(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      $.getJSON('https://api.openweathermap.org/data/2.5/forecast/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=imperial' + '&APPID=' + apiKey, function (a) {
        locationData.cityName = a.city.name
        locationData.country = a.city.country
        locationData.temp = Math.round(a.list[0].main.temp)
        locationData.conditions = a.list[0].weather[0].main
        updateHTML(locationData, a)
        getTime()
        $('body').css('visibility', 'visible')
        $('#tempMode').on('click', function () {
          locationData.temp = temperatureConversion(locationData.temp)
          $('#tempNum').html(locationData.temp + ' ')
        })
        updateMessage()
        mo('#tempMode')
      })
    })
  }
})
