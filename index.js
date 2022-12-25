import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();
//Создаём экземпляр класса  Telegraf, в конструктор передаём токен бота, который мы получили у BotFather. Через этот экземпляр будем управлять ботом.
const bot = new Telegraf(process.env.TELERGRAM_API_KEY);

const chatId = 293885802;
const intervalMs = 5000;
const getCatUrl = () => `https://cataas.com/cat?t=${new Date().getTime()}`;

const sendCat = async () => {
  bot.telegram
    .sendPhoto(chatId, getCatUrl())
    .then(() => setTimeout(sendCat, intervalMs));
};

sendCat();
