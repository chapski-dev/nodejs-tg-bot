import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();

//Создаём экземпляр класса  Telegraf, в конструктор передаём токен бота, который мы получили у BotFather. Через этот экземпляр будем управлять ботом.
const bot = new Telegraf(process.env.TELERGRAM_API_KEY);

//? Moжно импортировать словарь или адрес по которому он словарь тянет
//! Альтернатинвый динамический метод
// const greetings = {greetings:[...]};//тут сделать запрос к https://www.greetingsapi.com/greetings или просто скопировать ответ, который отдает этот API и захардкодить здесь

// const greetingsLookup = new Set(greetings.greetings.map(x => x.toLowerCase()));
// bot.on('text',async (ctx) => {
//     const text = ctx.update.message.text;
//     if(greetingsLookup.has(text.toLowerCase())) {
//         await ctx.reply(text);
//         return;
//     }
//     await ctx.reply(`Приветствие "${ctx.update.message.text}" не поддерживается.`);
// });

//^ Слушаем команду /help из tg и возвращаем ответ через ctx.reply
bot.command('help', (ctx) => {
  ctx.reply(`
  Бот может здороваться на разных языках.
  Список поддерживаемых приветствий:
  - привет - русский
  - hello - английский
  - hola - испанский
  `)
});

//^ Следим за вводимыми словами переданными первым параметром в метод hears из tg и возвращаем ответ через ctx.reply
bot.hears('привет', (ctx) => ctx.reply('привет'));
bot.hears('hello', (ctx) => ctx.reply('hello'));
bot.hears('hola', (ctx) => ctx.reply('hola'));

//! В случае НЕ совпадения параметров из вышеизложенных - возвращает дефолтный ответ.
bot.on('text', (ctx) => ctx.reply(`Приветствие "${ctx.update.message.text}" не поддерживается.`))

bot.launch().then(() => console.log('Started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));