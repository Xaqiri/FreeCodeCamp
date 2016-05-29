// Colors: [bgColor, titleColor, textColor, footerColor]
//var dayColors = ["#00e0ff", "#faff00", "#001dba", "#de6a00"];
var dayColors = ["#080C14", "#AADDDD", "#BBBBCC"];
var nightColors = ["#080C14", "#AADDDD", "#BBBBCC"];
// The following three var are used to change app colors based on time of day 
var d = new Date();
var h = d.getHours();
var timeOfDay = "";

// Mouseover function, used to highlight the F/C toggle for temperature 
var mo = function(id) {
    $(id).mouseover(function() {
        $(this).css("color", "#FFF");
    });
    $(id).mouseout(function() {
        if (timeOfDay === "day") { $(this).css("color", dayColors[2]); }
        else { $(this).css("color", nightColors[2]); }
    });
};

// Gets id for weather conditions 
var getConditionID = function(a) {
    return a.list[0].weather[0].id;
};

// Picks an icon based on the weather conditions id 
var getIcon = function(id) {
    var weatherIcons = ["wi-day-sunny", "wi-night-clear", "wi-cloudy",
    "wi-raindrops", "wi-snowflake-cold", "wi-cloud"];
    var icon = 0;
    if (id >= 200 && id < 600) { icon = 3; }
    else if (id >= 600 && id < 700) { icon = 4; }
    else if (id === 800 && timeOfDay === "day") { icon = 0; }
    else if (id === 800 && timeOfDay === "night") { icon = 1; }
    else if (id > 800 && id < 900) { icon = 2; }
    else { id = 5; }
    return weatherIcons[icon];
};

// Converts between farenheit and celsius 
var tempConversion = function(temp) {
    var newTemp = 0;
    if ($("#tempMode").text()==="F") {
        newTemp = Math.round((temp-32)*5/9);
        $("#tempMode").html("C");
    } else {
        newTemp = Math.round((temp*9/5)+32);
        $("#tempMode").html("F");
    }
    return newTemp;
};

// Changes app colors based on time of day 
var getTime = function() {
    if (h < 6 || h >=19) {
        $("body").css("background-color", nightColors[0]);
        $("#title").css("color", nightColors[1]);
        $("body").css("color", nightColors[2]);
        timeOfDay = "night";
    } else {
        $("body").css("background-color", dayColors[0]);
        $("#title").css("color", dayColors[1]);
        $("body").css("color", dayColors[2]);
        $("footer a").css("color", dayColors[3]);
        timeOfDay = "day";
    }
    return timeOfDay;
};

// Displays an appropriate message based on time of day 
var updateMessage = function() {
    var title = $("#title h1"); 
    if (h < 4 || h >= 20) {
        title.html("Good night!  Here's the weather:  ");
    } else if (h < 12) {
        title.html("Good morning!  Here's the weather:  ");
    } else if (h < 18) {
        title.html("Good afternoon!  Here's the weather:  ");
    } else {
        title.html("Good evening!  Here's the weather:  ");
    }
};

<<<<<<< HEAD:app/resources/app/js/weather.js
$(function() { 
=======
// Main function 
$(document).ready(function() {
>>>>>>> refs/remotes/origin/master:weather.js
    var loc = [];
    var cityName = "";
    var country = "";
    var temp = 0;
    var conditions = "";
    var apiKey = "8a5910e9d87b9b06f733d4de4979b649";
    var conditionIcon = "";
    var conID = 0;
    var timeOfDay = getTime(); 
    if (navigator.geolocation) {
        // Gets location data 
        navigator.geolocation.getCurrentPosition(function(position) {
            // API call to get forecast for current location 
            $.getJSON("http://api.openweathermap.org/data/2.5/forecast/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial" + "&APPID=" + apiKey, 
            // a is the weather data json
            function(a) { 
                cityName = a.city.name;
                country = a.city.country;
                temp = Math.round(a.list[0].main.temp);
                conditions = a.list[0].weather[0].main;
                $("#location").html(cityName + ", " + country);
                $("#conditions").html(conditions);
                $("#tempNum").html(temp + " ");
                conID = getConditionID(a);
                conditionIcon = getIcon(conID);
                $("#weatherIcon").html('<i class="' + "wi " + conditionIcon + '"></i>');
                $("body").css("visibility", "visible");
                $("#tempMode").on("click", function() {
                    temp = tempConversion(temp);
                    $("#tempNum").html(temp + " ");
                });
                updateMessage();
                mo("#tempMode");
                });
            });
        }
});
