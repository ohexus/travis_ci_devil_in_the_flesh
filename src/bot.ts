import config from 'config';

import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || config.get('TELEGRAM_BOT_TOKEN'));

export default bot;
