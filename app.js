const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const port = 3000;

app.get("/", (req, res) => {
  res.render('index');
});

app.post("/", (req, res) => {
  const body = req.body;
  const query = body.cityName;
  const apiKey = "bb937e35967e42dbc71d006490c69ee3";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    apiKey +
    "&q=" +
    query +
    "&units=" +
    unit;

  https.get(url, (response) => {
    console.log("statusCode: " + response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const city = weatherData.name;
      const icon = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1> Temprature in " + city + " is " + temp + " degrees.</h1>"
      );
      res.write("<p>Weather discription: " + desc + "</p>");
      res.write("<img src=" + imgURL + " alt=" + desc + " />");
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log("listening on port  " + port);
});
