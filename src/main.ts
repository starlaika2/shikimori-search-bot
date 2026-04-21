import { run } from '@grammyjs/runner'
import { Bot } from 'grammy'
import { setupDayjs } from './dayjs'
import { env } from './env'
import { setupHandlers } from './handlers'
import { setupMiddlewares } from './middlewares'

setupDayjs()

const bot = new Bot(env.BOT_TOKEN)
await bot.init()

bot.catch(({ error }) => {
	console.error(error)
})

setupMiddlewares(bot)
setupHandlers(bot)

run(bot, {
	runner: {
		fetch: {
			allowed_updates: ['message', 'inline_query', 'chosen_inline_result'],
		},
	},
})

console.log(`@${bot.botInfo.username} started`)
