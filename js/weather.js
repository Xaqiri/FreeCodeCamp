const apiKey = '8a5910e9d87b9b06f733d4de4979b649'

// Colors: [bgColor, titleColor, textColor, footerColor]
let dayColors = ["#0ad", "#ff0", "#fff", "#0f0"]
let nightColors = ['#001', '#add', '#ddd', '#a0a']
let bgColor, fgColor, tiColor, ftColor
let d = new Date()
let h = d.getHours()
let timeOfDay = ''

let locationData = {
	cityName: this.name,
	country: this.country,
	temp: this.temp,
	conditions: this.conditions,
	conditionId: this.conId,
	icon: this.icon
}

/* eslint-disable no-undef */
/* eslint-disable brace-style */
// Mouseover function for the F <=> C conversion button
let mo = function (id) {
  $(id).mouseover(function () {
    if (timeOfDay === 'day') { $(this).css('color', dayColors[1]) } else { $(this).css('color', nightColors[1]) }
  })
  $(id).mouseout(function () {
    if (timeOfDay === 'day') { $(this).css('color', dayColors[2]) } else { $(this).css('color', nightColors[2]) }
  })
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
		bgColor = nightColors[0]
		tiColor = nightColors[1]
		fgColor = nightColors[2]
		ftColor = nightColors[3]
		timeOfDay = 'night'
  } else {
		bgColor = dayColors[0]
		tiColor = dayColors[1]
		fgColor = dayColors[2]
		ftColor = dayColors[3]
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

let updateHTML = function () {
  $('#location').html(locationData.cityName + ', ' + locationData.country)
  $('#conditions').html(locationData.conditions)
  $('#tempNum').html(locationData.temp + ' ')
  $('#weatherIcon').html('<i class="' + 'wi ' + locationData.icon + '"></i>')
}

let displayHTML = function () {
	$('body').animate({
		opacity: 1,
		backgroundColor: bgColor,
		color: fgColor
	}, 800)
	$('#title').animate({
		color: tiColor
	}, 400)
	$('footer a').animate({
		color: ftColor
	}, 400)
}

$(function () {
	getTime()
	updateMessage()
	mo('#tempMode')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=imperial' + '&APPID=' + apiKey, function (data) {
				locationData = {
					cityName: data.name,
					country: data.sys.country,
					temp: Math.round(data.main.temp),
					conditions: data.weather[0].main,
					conditionId: data.weather[0].id,
				}
				locationData.icon = getWeatherIcon(locationData.conditionId)
				updateHTML()
				displayHTML()
        $('#tempMode').on('click', function () {
          locationData.temp = temperatureConversion(locationData.temp)
          $('#tempNum').html(locationData.temp + ' ')
        })
      })
    })
  }
})
