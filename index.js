import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();
//Создаём экземпляр класса  Telegraf, в конструктор передаём токен бота, который мы получили у BotFather. Через этот экземпляр будем управлять ботом.
const bot = new Telegraf(process.env.TELERGRAM_API_KEY);

// Регистрируем наше middleware — функцию обработчик сообщений. В данном случае оно возвращает ответным сообщением свойство ctx.update, сериализованное в JSON. Свойство update это сообщение, которое прислал боту Telegram. Подробнее о Middlewares и о параметре ctx будет дальше.
 bot.use(async (ctx) => {
   await ctx.reply(JSON.stringify(ctx.update, null, 2));
 });

 //! Добавлены мидлвары которые работаю так же как и в Express переходя от одной мидлвары к другой через функцию next(). Middleware так же принимает в себя контекст сообщения(см стооку 8) и саму фукнцию next.

//& const middleware1 = (ctx, next) => {
//^   console.log('ctx', ctx);
//^   console.log('middleware1');
//^   next();
//& };

//& const middleware2 = (ctx, next) => {
//^   console.log('middleware2');
//& };

//& const middleware3 = (ctx, next) => {
//^   console.log('middleware3');
//& };

//? bot.use(middleware1);
//? bot.use(middleware2);
//? bot.use(middleware3);


//По умолчанию бот работает в режиме long-polling, то есть сам начинает делать запросы в Bot API, чтобы получить новые сообщения. Функция launch запускает этот процесс и возвращает Promise, когда Promise выполнится, выводим в консоль сообщение, что бот запустился.
bot.launch().then(() => console.log("Started"));

//Далее регистрируем обработчики, которые произведут необходимые операции для остановки бота, в случае если приложение получит сигнал о прекращении работы. Например, если нажмёте Ctrl+C в Терминале в котором запустили бота.
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
