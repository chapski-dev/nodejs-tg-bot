import * as dotenv from "dotenv";
import { Telegraf, Markup } from "telegraf";

dotenv.config();

//Создаём экземпляр класса  Telegraf, в конструктор передаём токен бота, который мы получили у BotFather. Через этот экземпляр будем управлять ботом.
const bot = new Telegraf(process.env.TELERGRAM_API_KEY);

//Сначала объявим функцию getRandomInt, которая генерирует случайное число.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Сначала объявим функцию getRandomInt, которая генерирует случайное число.
const getCoinSide = () => (getRandomInt(0, 1) === 0 ? "Орёл" : "Решка");

// С помощью модуля Markup в переменной coinInlineKeyboard создаем inline-клавиатуру для сообщений о подбрасывание монетки. С одной callback-кнопкой с текстом «Подбросить ещё раз». Вторым параметром указывается строка, которую Telegram передаст в апдейте боту при нажатии на кнопку. Указываем flip_a_coin, чтобы знать, что нужно перебросить монетку (можно указать произвольная текст максимальной длиной 64 байта).

// В результате в переменной coinInlineKeyboard будет объект, следующего вида, который можно создать вручную. Модуль Markup просто помогает это сделать.
const coinInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("Подбросить ещё раз", "flip_a_coin"),
]);
//!
// С помощью bot.hears('Подбросить монетку', ...); регистрируем middleware, которое срабатывает, когда пользователь присылает текст «Подбросить монетку». В ответ присылаем сообщение со случайным текстом («Орёл» или «Решка») и прикрепляет inline-клавиатуру из переменной coinInlineKeyboard.
bot.hears("Подбросить монетку", (ctx) =>
  ctx.reply(getCoinSide(), coinInlineKeyboard)
);

//С помощью bot.action('flip_a_coin', ...); регистрируем middleware, которое реагирует на нажатие кнопок, у которых в callback_data указано значение flip_a_coin — если ещё точнее, на апдейты у которых в callback_query.data указано значение flip_a_coin.
bot.action("flip_a_coin", async (ctx) => {
  await ctx.editMessageText(
    `${getCoinSide()}\nОтредактировано: ${new Date().toISOString()}`,
    coinInlineKeyboard
  );
});

//! Генерация случайного числа
// Cоздаем функцию, которая генерирует число от 0 до 100, создаем inline-клавиатуру, регистрируем два middleware (для реакции на текст «Случайное число» и обработки апдейтов с callback_query.data равным random_number).
const getRandomNumber = () => getRandomInt(0, 100);
const numberInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("Сгенерировать новое", "random_number"),
]);
bot.hears("Случайное число", (ctx) =>
  ctx.reply(getRandomNumber().toString(), numberInlineKeyboard)
);
bot.action("random_number", async (ctx) => {
  await ctx.editMessageText(
    `${getRandomNumber()}\nОтредактировано: ${new Date().toISOString()}`,
    numberInlineKeyboard
  );
});

//! Клавиатура с вариантами ответа
// Последним шагом регистрируем middleware, которое на любой апдейт, который не обработан другим middleware, присылать сообщение с текстом «Что нужно сделать?» и с клавиатурой с вариантами ответа «Подбросить монетку» и «Случайное число».

// Для создания клавиатуры опять используем модуль Markup, который помогает создать объект нужного вида, который можно создать и «вручную».
bot.use(async (ctx) => {
  await ctx.reply(
    "Что нужно сделать?",
    Markup.keyboard([["Подбросить монетку", "Случайное число"]]).resize()
  );
});

bot.launch().then(() => console.log("Started"));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
