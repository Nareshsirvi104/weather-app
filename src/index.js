const express = require("express");
const path = require("path");
const weatherData = require("../utils/weatherData");


const app = express();
const port = process.env.PORT || 3000;

// Set view engine to Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
// Serve static files (CSS & JS)
app.use(express.static(path.join(__dirname, "../public")));


app.get("/", (req, res) => {
    res.render("index"); // Render the homepage
});
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "❌ Address is required!" });
    }

    weatherData(req.query.address, (error, result) => {
        if (error) {
            return res.send({ error });
        }
        res.send(result);  // Send the result as a JSON object
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
