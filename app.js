require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const https = require("https");

const token = process.env.TOKEN;
const api_key = process.env.API_KEY;

var bot = new TelegramBot(token, {polling: true});

bot.on("polling_error",console.log);

bot.onText(/\/start/, (msg)=> {
  bot.sendMessage(msg.chat.id,"Welcome"+" "+msg.chat.first_name+"\n Check your city weather forcast");
});

bot.onText(/\/temp (.+)/,function(msg,match){
  var city = match[1]
  var chatId = msg.chat.id;
  let url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+api_key;
  https.get(url,function(response){
    console.log(response);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      console.log(temp);
      console.log(weatherData.weather[0].description);
      bot.sendMessage(chatId, temp+" is the current temperature of "+city);
      bot.sendMessage(chatId,"the atmospher will be"+" "+description);
    })
  })

});
