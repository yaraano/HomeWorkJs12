const row = document.querySelector('.row')
const all = document.querySelector('#all')
const search = document.querySelector('#search')
const searchBox = document.querySelector('.search-wrapper')
const input = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')
const box = document.querySelector('.box')
const cardBody = document.querySelector('#card-body')
const handleGetCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(r => r.json())
        .then(data => {
            data.forEach(country => {
                row.innerHTML += `
        <div class="col-4">
            <div class="card">
                    <img src="${country.flags.png}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${country.name.common}</h5>
                        <p class=" card-text">${country.capital}</p>
<!--                        <button></button>-->
                    </div>
                </div>
            </div>
        `
            })
        })
}

handleGetCountries()

all.addEventListener('change', () => {
    if (all.checked) {
        searchBox.classList.add('hidden')
        row.classList.remove('hidden')
    }
})

search.addEventListener('change', () => {
    if (search.checked) {
        searchBox.classList.remove('hidden')
        searchBox.classList.add('search-panel')
        row.classList.add('hidden')
    }
})

searchBtn.addEventListener('click', () => {
    box.innerHTML = '';
    fetch(`https://restcountries.com/v3.1/name/${input.value}`)
        .then(r => r.json())
        .then(data => {
            if (data.length > 0) {
                const country = data[0]; // Получаем первую страну из данных
                let currencyName = Object.values(country.currencies).map(el => el.name).join(', ');
                let currencySymbol = Object.values(country.currencies).map(el => el.symbol).join(', ');
                let languages = Object.values(country.languages).map(el => el).join(', ');
                const capital = country.capital[0];

                fetch(`https://api.weatherapi.com/v1/current.json?key=e12f9e78fd7b41998c6132036231411&q=${capital}&aqi=no`)
                    .then(res => res.json())
                    .then(dataWeather => {
                        box.innerHTML += `
                            <div class="col-6">
                                <div class="card">
                                    <img src="${country.flags.png}" class="card-img-top" alt="...">
                                    <div class="card-body" id="card-body">
                                        <h5 class="card-title">${country.name.common}</h5>
                                        <p class="card-text">${country.capital}</p>
                                        <p class="card-text">Currency : ${currencyName} ${currencySymbol}</p>
                                        <p class="card-text">Languages : ${languages}</p>
                                        <a target="_blank" href="${country.maps.googleMaps}">Google maps</a>
                                        <p>Current weather:</p>
                                        <p>Temperature:  ${dataWeather.current.temp_c}c</p>
                                        <p>Condition: ${dataWeather.current.condition.text}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
            }
        });
})
input.addEventListener('keypress', () => {
    if (event.key === 'Enter') {
        event.preventDefault()
        searchBtn.click()
    }
})