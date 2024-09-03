const city = "Toronto"
const url = `http://localhost:3000/api/weather?name=${city}`;
const mainTemp = document.getElementById("mainTemp")
const feelsLike = document.getElementById("feelsLike")

function militaryToStandardTime(militaryTime) {
  const [hours, minutes] = militaryTime.split(':').map(Number);
  const ampm = hours >= 12 ? 'pm' : 'am';
  const standardHours = hours % 12 || 12;
  const standardTime = `${standardHours}:${minutes.toString().padStart(2, '0')}${ampm}`;

  return standardTime;
}


fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        cityCountry.innerHTML = city
        mainTemp.innerHTML = `${data.temp}&deg;`   
        feelsLike.innerHTML += data.feelsLike
        for (let i = 0; i < 24; i++) {
            hourlyInfo.innerHTML += `                    
                <div class="flex flex-col gap-3">
                    <p class="text-sm">${militaryToStandardTime(data.hours[i].hour)}</p>
                    
                    <p class="mb-4">${data.hours[i].hourTemp}&deg;</p>
                </div>`
        }
    })
    .catch(error => {
        console.error('Error fetching the weather data: ', error);
    })