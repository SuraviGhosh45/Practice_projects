let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temparature = document.getElementById('temparature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
let main=document.querySelector('main');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (valueSearch.value != '') {
        searchWeather();
    }
});

let id = '439d4b804bc8187953eb36d2a8c26a02';
let url='https://openweathermap.org/data/2.5/weather?&units=metric&appid='+id;

const searchWeather = () => {
    fetch(url+'&q='+valueSearch.value)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
    if (data.cod === 200){
        city.querySelector('figcaption').innerText=data.name;

        temparature.querySelector('img').src='http://openweathermap.org/img/wn/' +data.weather[0].icon+'@4x.png';
        temparature.querySelector('figcaption span').innerText=data.main.temp;
        description.innerText=data.weather[0].description;
        clouds.innerText=data.clouds.all;
        humidity.innerText=data.main.humidity;
        pressure.innerText=data.main.pressure;
    }
    else{
        main.classList.add('error');
        setTimeout(()=>{
            main.classList.remove('error');
        },1000)
    }
        })
 valueSearch.value='';
}

    const initApp=()=>{
        valueSearch.value='Japan';
        searchWeather();
    }
initApp();