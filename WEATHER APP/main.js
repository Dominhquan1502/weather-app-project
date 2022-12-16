const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");
let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4eb0b97c362ecf416ff986951be3ad8c`;
    fetchData();
}



function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4eb0b97c362ecf416ff986951be3ad8c`;
    fetchData();
}
function fetchData() {
    fetch(api).then(response => console.log(response.json()))
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result))
        // infoTxt.innerText = "Something went wrong";
        // infoTxt.classList.replace("pending", "error");
};

function weatherDetails(info) {
    if (info.cod == '404') {
        infoTxt.innerText = `${inputField.value} Không phải là tên thành phố!`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".column-feels").innerText ='Feels like' + ' ' + Math.floor(feels_like) + '°';
        weatherPart.querySelector(".column-humidity").innerText = `Humidity ${humidity}%`;
        
        infoTxt.classList.remove('pending','error');
        wrapper.classList.add('active');
        console.log(info);
    }
}







