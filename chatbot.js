
require('dotenv').config()
const request = require('request')
const cheerio = require('cheerio')
const googleScrapper = require('google-search-scraper')
const Botkit       = require('botkit');
// use your own API Token
const slack_token  = process.env.SLACK_TOKEN
const wit_token = process.env.WIT_TOKEN
const {Wit, log} = require('node-wit')
const client = new Wit({
    accessToken : wit_token,
})

function slackBot() {
    var controller = Botkit.slackbot({});
    var bot = controller.spawn({
        token : slack_token
    })
    bot.startRTM(function(err, bot, payload){
        if (err) {
            throw new Error('Could not connect to Slack')
        }
        console.log('Connection Established!')
    })
    controller.on('direct_message', function(bot, message){
        client.message(message.text, {}).then(function(witResponse){
            console.log(JSON.stringify(witResponse))
            var userIntent = witResponse.entities.intent[0]
            if(userIntent){
                userIntent = userIntent.value
                console.log("intent  "+ JSON.stringify(userIntent))
                if(userIntent == "greeting") {
                    bot.reply(message, 'Haiii, ada yang bisa disti bantu? :D')
                } else if (userIntent == "order_plane_ticket") {
                    bot.reply(message, 'Siapp boss, disti bakal pesen tiket pesawat nyaa')
                } else if(userIntent == "order_food") {
                    bot.reply(message, 'Siapp boss, mau pesen makan apa?')
                } else if(userIntent == "ask_kabar"){
                    bot.reply(message, 'Kabar baik, kamu sendiri gimana?')
                } else if(userIntent == "order_train_ticket") {
                    bot.reply(message, 'Siapp boss, disti bakal pesen tiket kereta nyaa')
                } else if (userIntent == 'order_cinema_ticket') {
                    bot.reply(message, 'Siapp boss, disti bakal pesen tiket bioskop nyaa')
                }
            } else {
                bot.reply(message, 'Maaf, Disti ga ngerti kamu ngomong apa :D ')
            }
        })
    })
}

//Problem with google recaptcha

// function scrapeWikipedia(queryValue) {
//     console.log(queryValue+"  this is query value")
//     var option = {
//         query : 'wonder woman',
//         limit : 2
//     }
//     googleScrapper.search(option, function(err, url){
//         console.log(url+" this is url")
//         if (err) {
//             console.log(err)
//         }
//         urlComponent = url.split("/")
//         for (var index in urlComponent) {
//             if(urlComponent[index] == "en.wikipedia.org") {
//                 request({
//                     uri : url,
//                 }, function(err, resp, body){
//                     var $ =  cheerio.load(body)
//                     var filmDescription = $(".mw-parser-output > p:first-of-type").text();
//                     console.log(filmDescription)
//                     return filmDescription
//                 })
//             }
//         }
//     })
// }
module.exports = slackBot
