const input = document.querySelector('#time')
const button = document.querySelector('#getWeather')
const dayTemp = document.querySelector('.dayTemp')
const resultBox = document.querySelector('.result')
const temp = document.querySelector('.temp')
const temps = document.querySelector('.temps')
const locationCity = document.querySelector('.city')
const tempMax = document.querySelector('.maxTemp')
const minMax = document.querySelector('.minMax')
const imgDay = document.querySelector('.imgCondition')
const feelsLike = document.getElementById('feels')
const card = document.querySelectorAll('.card')

button.addEventListener('click', getWeather)

function getWeather() {
    dayTemp.innerHTML = ""
    const city = input.value
    const key = '4ae9be7e0ff7408493d181328220606'
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            let location = data.location.name
            let dayConditionIcon = data.current.condition.icon
            let celsius = data.current.temp_c.toFixed()
            let maxTemp = data.forecast.forecastday[0].day.maxtemp_c.toFixed()
            let minTemp = data.forecast.forecastday[0].day.mintemp_c.toFixed()
            let feelsLikeC = data.current.feelslike_c.toFixed()
            let hours = data.forecast.forecastday[0].hour
            console.log(data)
            hours.forEach((hour, i) => {         
                const tempHour = hour.temp_c.toFixed()
                const dayHour = hour.time.substring(11)
                const iconTemp = hour.condition.icon
                console.log(iconTemp)
                dayTemp.innerHTML += (`
                    <div class="card" id="${i}">
                        <p>${dayHour}</p> 
                        <img src="${iconTemp}" alt="">
                        <h4>${tempHour}°</h4>
                    </div>`)
            })
            console.log(card)
            imgDay.src = dayConditionIcon
            locationCity.innerText = location
            temp.innerText = celsius + "°"
            minMax.innerText = (`${maxTemp}/${minTemp}`)
            feelsLike.innerText = `Sensação termica de ${feelsLikeC}°`
        })
}