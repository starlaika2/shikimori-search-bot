import { autoRetry } from '@grammyjs/auto-retry'
import { sequentialize } from '@grammyjs/runner'
import { apiThrottler } from '@grammyjs/transformer-throttler'
import type { Bot } from 'grammy'

export function setupMiddlewares(bot: Bot) {
	bot.api.config.use(autoRetry(), apiThrottler())
	bot.use(sequentialize(ctx => ctx.from?.id.toString()))
}
