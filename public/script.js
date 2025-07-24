function getWeather() {
    const location = document.getElementById("location").value;  // Get input value
    if (!location) {
        alert("❌ Please enter a location!");
        return;
    }
const resultDiv = document.getElementById("weather-result");
resultDiv.innerHTML = ""; // Clear previous result

   fetch(`/weather?address=${encodeURIComponent(location)}`)
 // Make the API call
        .then(response => response.json())  // Parse JSON response
        .then(data => {
            const resultDiv = document.getElementById("weather-result");

            if (data.error) {
                resultDiv.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
            } else {
                // Format and display the weather data
                resultDiv.innerHTML = `
                    <h2>📍 ${data.location}</h2>
                    <p>🌡️ Temperature: ${data.temperature}</p>
                    <p>💧 Humidity: ${data.humidity}</p>
                    <p>💨 Wind Speed: ${data.wind}</p>
                    <p>🌍 Pressure: ${data.pressure}</p>
                    <p>👀 Visibility: ${data.visibility}</p>
                `;
            }
        })
       .catch((error) => {
    resultDiv.innerHTML = `<p style="color:red;">⚠️ Failed to fetch weather data. Please try again later.</p>`;
    console.error("Fetch error:", error);
});

}
