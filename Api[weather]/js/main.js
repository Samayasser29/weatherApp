//https://api.weatherapi.com/v1/forecast.json?key=bb4224dac5c6428c91e150508241912&q=alexandria&days=3
const apiKey = "bb4224dac5c6428c91e150508241912" ;
const baseUrl = "https://api.weatherapi.com/v1 " ;
let weatherData ={}
const locationBtn =document.querySelector("#locationBtn")
const locationInput = document.querySelector("#locationInput")
let userCity ;

function getData(dates){
    const dateDetails = new Date(dates) ;
    const day = dateDetails.toLocaleString("en-us" ,{weekday:"long"})
    const dayDate = dateDetails.toLocaleString("en-us" ,{day:"2-digit"})
    const month = dateDetails.toLocaleString("en-us" ,{month:"long"})
    // console.log( day ,dayDate ,month);
    return{day ,dayDate ,month }   
}


async function getWeather(currentLocation ="alexandria"){
    if(currentLocation.length===0) getWeather(); ;
    if(currentLocation.length<3)return ;
    try{
      let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${currentLocation}&days=3`)
      let data = await  response.json();
      weatherData = data ;
      displayWeather(weatherData.forecast.forecastday)
    //   console.log(weatherData);
       
    }catch(error){

    }
}

// getWeather() ;

function displayWeather(weatherArr){
//   console.log(weatherArr)
  let cartona =``
  for(let i=0 ; i<weatherArr.length ;i++){
    let {day , dayDate,month}= getData(weatherArr[i].date)
    // console.log( day ,dayDate ,month);

    
     cartona += ` <div class="col-md-4 ">
                       <div class="weather-card rounded-3  mt-5 overflow-hidden">
                        <div class="date-details d-flex justify-content-between p-2 pb-0">
                        ${i===0 ? `<p>${day}</p>
                            <p> <span>${dayDate}</span> ${month}</p>`:
                            `<p class="mx-auto">${day}</p>`}    
                        </div>

                        <div class="weather-content pt-2 ps-3 ">
                        ${i===0 ?`<h6 class="mt-2">${weatherData.location.name}</h6>
                            <h1 class="text-white mt-4">${weatherData.current.temp_c} &deg;c</h1>
                             <div class="forecast-icon mx-auto">
                                <img class="mx-auto" src="${weatherData.current.condition.icon}" alt="">
                            </div>
                            <p class="mt-2">${weatherArr[i].day.condition.text}</p>` :

                            `<div class="text-center p-4">
                              <div class="forecast-icon ">
                                <img class="mt-4 mb-4" src="${weatherData.current.condition.icon}" alt="">
                            </div>
                            <h5 class="bold text-light">${weatherArr[i].day.maxtemp_c} &deg;c</h5>
                            <p class="text-light">${weatherArr[i].day.mintemp_c} &deg;c</p>
                            <p class="pt-4 pb-4">${weatherArr[i].day.condition.text}</p>
                        
                            </div>`
                            }
                            
                        </div>

                        <div class="d-flex justify-content-between p-2 pb-3">
                        ${i===0 ? `<span><img src="./images/icon-umberella.png" alt="">  ${weatherArr[i].day.daily_chance_of_rain}</span>
                            <span> <img src="./images/icon-wind.png" alt=""> ${weatherData.current.wind_kph}km/h</span>
                            <span> <img src="./images/icon-compass.png" alt=""> ${weatherData.current.wind_dir}</span>`:``}
                            
                        </div>

                       </div>
                    </div>`
  }
  document.querySelector("#myData").innerHTML= cartona ;

}

locationInput.addEventListener("input" ,function(e){
   userCity = e.target.value;
    getWeather(userCity)
   
    
})

window.navigator.geolocation.getCurrentPosition((data)=>{
//  console.log(data);
//  console.log(data.coords.latitude);
//  console.log(data.coords.longitude);
 getWeather(`${data.coords.latitude},${data.coords.longitude}`)
 console.log("done");
 
},
(error)=>{
    console.log("failed");
    getWeather()
})

