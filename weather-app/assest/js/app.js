var search = document.querySelector('.search');
var city = document.querySelector('.city');
var country = document.querySelector('.country');
var value = document.querySelector('.value');
var shortDesc = document.querySelector('.short-desc');
var visibility = document.querySelector('.visibility span');
var wind = document.querySelector('.wind span');
var sun = document.querySelector('.sun span');
var time = document.querySelector('.time');
var content = document.querySelector('.content');
var body = document.querySelector('body');

async function changeWeatherUI(capitalSearch){
    
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&units=metric&appid=aad49520b4ce3e388a9acea9682a4cb2`;

    let data = await fetch(apiURL).then(res=> res.json())

    console.log(data);

    if(data.cod == 200){
        content.classList.remove('hide');
        city.innerText = data.name;
        country.innerText = data.sys.country;
        visibility.innerText = data.visibility + 'm';
        wind.innerText = data.wind.speed + 'm/s';
        sun.innerText = data.main.humidity + '%';
        let temp = Math.floor(data.main.temp);
        value.innerText = temp;
        shortDesc.innerText = data.weather[0] ? data.weather[0].main : '';
        time.innerText = new Date().toLocaleString('vi');   

        body.setAttribute('class','xuan');
        if(temp <= 25){
            body.setAttribute('class','xuan');
        }
        if(temp >= 28){
            body.setAttribute('class','ha');
        }
        if(temp <= 22){
            body.setAttribute('class','thu');
        }
        if(temp <= 19){
            body.setAttribute('class','dong');
        }
        
    }
    else{
        console.warn("Not Found!");
        content.classList.add('hide');
    }
}

//changeWeatherUI();


search.addEventListener('keypress', function(e){
    if(e.code === 'Enter'){
        let capitalSearch = search.value.trim();
        changeWeatherUI(capitalSearch)
    }
})

changeWeatherUI("hue")