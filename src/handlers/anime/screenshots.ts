import { Composer, InlineQueryResultBuilder } from 'grammy'
import { INLINE_MAX_RESULTS } from '#/constants'
import { getAnimeScreenshots } from '#/shikimori/anime/executors'
import { nextOffset } from '#/utils/next-offset'

export const animeScreenshotsHandler = new Composer()

animeScreenshotsHandler.inlineQuery(/^!anime screenshots (\w+)$/, async ctx => {
	const id = ctx.match[1]
	const page = Number(ctx.inlineQuery.offset || 1)
	const screenshots = await getAnimeScreenshots({ ids: id })
	if (!screenshots) {
		await ctx.answerCallbackQuery('Ошибка: аниме не найдено')
		return
	}

	const results = screenshots
		.slice(INLINE_MAX_RESULTS * (page - 1), INLINE_MAX_RESULTS * page)
		.map(screenshot => {
			return InlineQueryResultBuilder.photo(`screenshot ${screenshot.id}`, screenshot.originalUrl)
		})

	await ctx.answerInlineQuery(results, {
		next_offset: nextOffset(page, results),
	})
})
