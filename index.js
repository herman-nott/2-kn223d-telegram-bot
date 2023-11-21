const pytannya = ['можна питання?', 
                'можна питання', 
                'можно питання?', 
                'можно питання', 
                'можна пытання?', 
                'можна пытання', 
                'можно пытання?', 
                'можно пытання'
];


const quotes = require('./quotes.js'); // quotes list
const getRandomInt = require('./functions.js'); // getRandomInt function

const TelegramApi = require('node-telegram-bot-api');

const token = '6804817926:AAGNQsMKvKQFjF7PxpYxGQfOrllVFLxJUMI';

const bot = new TelegramApi(token, {polling: true});

const messageCounters = {};

const commands = [
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
    },
    {
        command: '/music',
        description: 'Песня.'
    }
]



function start() {
    bot.setMyCommands(commands);
    
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatID = msg.chat.id;

        if (msg.chat.type === 'group' || msg.chat.type === 'supergroup' || msg.chat.type === 'private') {
            if (!messageCounters[chatID]) {
                messageCounters[chatID] = 0;
            }
        }
        messageCounters[chatID]++;

        if (messageCounters[chatID] % 50 === 0) {
            const quote_or_voice = getRandomInt(0, 2)

            const messageId = msg.message_id;

            if (quote_or_voice === 0) {
                const current_index = getRandomInt(0, quotes.length);
                const current_quote = quotes[current_index].text;
                const current_author = quotes[current_index].author;

                return bot.sendMessage(chatID, `${current_quote} \n\n Ⓒ <em>${current_author}</em>`, {reply_to_message_id: messageId, parse_mode: "html"});
            } else if (quote_or_voice === 1) {
                const current_voice_index = getRandomInt(1, 31);

                const voiceFilePath = `./voice/${current_voice_index}.mp3`;
                
                return bot.sendVoice(chatID, voiceFilePath, {reply_to_message_id: messageId});
            }
        }

    
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

        } else if (pytannya.includes(String(text).toLowerCase())) {
            const messageId = msg.message_id;
            const gifFilePath = './gif/ni.gif';

            return bot.sendAnimation(chatID, gifFilePath, {reply_to_message_id: messageId})
        } else if (text === '/music' || text === '/music@kn223d_quotes_bot') {
            const current_music_index = getRandomInt(1, 11);

            const musicFilePath = `./music/${current_music_index}.mp4`;
            
            return bot.sendVideoNote(chatID, musicFilePath);
        }

        // return bot.sendMessage(chatID, 'Я тебя не понял. Попробуй ещё раз.');
    });
}

start();