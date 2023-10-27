const quotes = require('./quotes.js'); // quotes list
const getRandomInt = require('./functions.js'); // getRandomInt function

const TelegramApi = require('node-telegram-bot-api');

const token = '6804817926:AAGNQsMKvKQFjF7PxpYxGQfOrllVFLxJUMI';

const bot = new TelegramApi(token, {polling: true});

function start() {
    bot.setMyCommands([
        {
            command: '/start',
            description: 'Приветствие.'
        },
        {
            command: '/quote',
            description: 'Генерация случайной цитаты.'
        },
        {
            command: '/voice',
            description: 'Генерация случайного голосового.'
        }
    ]);
    
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatID = msg.chat.id;
    
        if (text === '/start' || text === '/start@kn223d_quotes_bot') {
            return bot.sendMessage(chatID, 'Привет!');
        } else if (text === '/quote' || text === '/quote@kn223d_quotes_bot') {
            // const chatID = msg.chat.id;

            const current_index = getRandomInt(0, quotes.length);
            const current_quote = quotes[current_index].text;
            const current_author = quotes[current_index].author;

            return bot.sendMessage(chatID, `${current_quote} \n\n Ⓒ <em>${current_author}</em>`, {parse_mode: "html"});
        } else if (text === '/voice' || text === '/voice@kn223d_quotes_bot') {
            // const chatID = msg.chat.id;

            const current_voice_index = getRandomInt(1, 31);

            const voiceFilePath = `./voice/${current_voice_index}.mp3`;
            
            return bot.sendVoice(chatID, voiceFilePath);

        }

        // return bot.sendMessage(chatID, 'Я тебя не понял. Попробуй ещё раз.');
    });
}

start();