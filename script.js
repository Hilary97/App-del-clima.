const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".cities");

form.addEventListener("submit", e => {
    e.preventDefault();

    const apiKey = "259e8a3a0dc6e9055516198f35059fd9";
    const inputVal = input.value.trim();
    if (!inputVal) {
        msg.textContent = "Introduce el nombre de una ciudad";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(inputVal)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Ciudad no encontrada");
            return response.json();
        })
        .then(data => {
            msg.textContent = "";
            const { main, name, sys, weather } = data;
            const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
                <h2 class="city-name" data-name="${name},${sys.country}">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                </h2>
                <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
                <figure>
                    <img class="city-icon" src="${icon}" alt="${weather[0].main}">
                    <figcaption>${weather[0].description}</figcaption>
                </figure>
            `;
            li.innerHTML = markup;
            list.appendChild(li);
            input.value = "";
        })
        .catch(() => {
            msg.textContent = "Por favor, pon una ciudad válida";
        });
});

