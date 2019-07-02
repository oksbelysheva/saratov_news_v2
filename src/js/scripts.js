const cityName = "Аткарск";
const weatherData = {
    key: "d9341ad1b5c8e3239b51c0d0abe05c01",
    city: "Atkarsk",
}

//Дата и время
var d = new Date();
var monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
var date = document.getElementById("date");
const city = document.getElementById('city');

function getDate() {
    date.innerHTML = d.getDate() + " " + "<span class='dateMonth'>" + monthNames[d.getMonth()] + "<span class='dateMonth'>";
}

function getCity() {
    city.innerHTML = cityName;
}

getDate();
getTime();
getCity();

function getTime() {
    const d = new Date(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        strTime = [hours % 24, (minutes < 10 ? "0" + minutes : minutes)].join(':');

    time.innerHTML = strTime;
    setTimeout(getTime, 1000);

}

const request_weather = "https://api.openweathermap.org/data/2.5/weather?q=" +
    weatherData.city +
    ",ru&units=imperial&appid=" +
    weatherData.key;
const weatherTemp = document.getElementById('temp');
const weatherIcon = document.getElementById('icon');
$.post(request_weather, function(data) {
    var f = data.main.temp;
    var c = Math.floor((f - 32.0) * 5.0 / 9.0);
    weatherTemp.innerHTML = (c > 0) ? "+" + c : c;

    const icon = "../img/weather/" + data.weather[0].main + ".png";

    weatherIcon.src = icon;
});

$(document).ready(function() {
    $('.burger').on('click', function() {
        $(".burger").toggleClass('active');
        $(".page-header__menu").toggleClass('page-header__menu-open');
    });
});


var h_mrg = 0; // отступ когда шапка уже не видна  
var h_hght = document.getElementById("page-header__top").offsetHeight;
var advertisingTop = document.querySelector(".page-header-advertising img");

$(function() {
    var elem = $('.page-header__bottom');
    var top = $(this).scrollTop();

    if (top == 0) {
        advertisingTop.style.height = h_hght + "px";
        elem.css('top', h_hght);
    } else if (top > h_hght) {
        elem.css('top', h_mrg);
    }

    $(window).on("load resize scroll", function() {
        h_hght = document.getElementById("page-header__top").offsetHeight;
        top = $(this).scrollTop();
        advertisingTop.style.height = h_hght + "px";
        if (top + h_mrg < h_hght) {
            elem.css('top', (h_hght - top));
        } else {
            elem.css('top', h_mrg);
        }
    });
});

const eur = document.getElementById('eur'),
    usd = document.getElementById('usd');

$.getJSON("https://www.cbr-xml-daily.ru/daily_json.js",
    function(data) {
        eur.innerHTML = data.Valute.EUR.Value.toFixed(2);
        usd.innerHTML = data.Valute.USD.Value.toFixed(2);
    })