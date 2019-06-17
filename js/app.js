window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locaTime = document.querySelector('.location-timezone');
    let unit = document.querySelector('.unit');
    let btn = document.querySelector('.toggle');
    let page = document.querySelector('.page');
    let sun_1  = document.querySelector('.sun');
    let sun_2  = document.querySelector('.sun_2');
    let cloud_1  = document.querySelector('.cloud');
    let cloud_2  = document.querySelector('.cloud_2'); 


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat  = position.coords.latitude;

            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/1cd6326cc793a361bb7356c292c06333/${lat}, ${long}`;

            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;

                    console.log(data);

                    // SET DOM ELEMENTS FROM API 
                    celcius          = (temperature - 32) * 5/9;
                    unit.textContent = 'C°';
                    tempDegree.textContent      = Math.trunc(celcius + " ");
                    tempDescription.textContent = summary;
                    locaTime.textContent        = data.timezone ;

                    if(data.timezone === 'Africa/Johannesburg') {
                        locaTime.textContent = 'Cape Town, South Africa';
                    } else {
                        return data.timezone;
                    }
                    
                    btn.textContent = 'C°';
    
                    btn.addEventListener('click', ()=> {
                        if (unit.innerHTML === 'C°') {
                            unit.innerHTML = 'F°';
                            btn.innerHTML = 'C°';
                            tempDegree.innerHTML = Math.trunc(temperature + '');
                        } else {
                            unit.innerHTML = 'C°';
                            btn.innerHTML = 'F°';
                            tempDegree.textContent = Math.trunc(celcius + " ");
                        }
                    })

                    // Set Icons from API
                    setIcons(icon, document.querySelector('.icon'));
                })
        }); 
    } 

    // Replaces DARK SKY API icon syntax with skycons syntax
    setIcons = (icon , iconID) => {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();

        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    // Set Background and Greeting
    setBgGreet = () => {
        let today = new Date(),
            hour = today.getHours();
    
        if (hour < 12) {
        // Moring
        page.style.backgroundColor = '#83929F';
        sun_1.style.fill = '#31302Eb0';
        sun_2.style.fill = '#94908Db0';
        cloud_1.style.fill = '#66828eb0';
        cloud_2.style.fill = '#DAD9D7b0';
        } else if (hour < 18) {
        // Afternoon
        page.style.backgroundColor = '#AFDFF3';
        sun_1.style.fill = '#FFCC33b0';
        sun_2.style.fill = '#ffe484b0';
        cloud_1.style.fill = '#F0F0F0b0';
        cloud_2.style.fill = '#DAD9D7b0';
        } else {
        // Evening
        page.style.backgroundColor = '#384344';
        sun_1.style.fill = '#31302Eb0';
        sun_2.style.fill = '#94908Db0';
        cloud_1.style.fill = '#66828eb0';
        cloud_2.style.fill = '#DAD9D7b0';
        }
    }
    setBgGreet();
});