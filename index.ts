import bot from './src/bot';

import responseTimeMiddleware from './src/middlewares/responseTime.middleware';

import commandRouter from './src/routes/command.routes';

// Log response time
bot.use(responseTimeMiddleware);

// Hear command
bot.hears(/\/.[^ ]+/g, commandRouter);

// Start bot
bot.launch().then(() => console.log('bot started successfully.'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
