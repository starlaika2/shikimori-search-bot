import type { Bot } from 'grammy'
import { animeHandler } from './anime'
import { characterHandler } from './character'
import { helpHandler } from './help'
import { mangaHandler } from './manga'

export function setupHandlers(bot: Bot) {
	bot.use(helpHandler)

	bot.use(animeHandler)
	bot.use(mangaHandler)
	bot.use(characterHandler)

	bot.use(async ctx => {
		if (ctx.has('callback_query')) {
			await ctx.answerCallbackQuery()
		} else if (ctx.has('inline_query')) {
			await ctx.answerInlineQuery([], { cache_time: 0 })
		}
	})
}
