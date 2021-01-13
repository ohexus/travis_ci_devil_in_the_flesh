import { Context } from 'telegraf';

export default interface CtxMessageText extends Context {
  message: { text?: string } & Context['message'];
}
