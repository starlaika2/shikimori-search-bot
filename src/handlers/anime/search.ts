import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { CACHE_TIME, INLINE_MAX_RESULTS } from '#/constants'
import { searchAnime } from '#/shikimori/anime/executors'
import { nextOffset } from '#/utils/next-offset'

export const animeSearchHandler = new Composer()

animeSearchHandler.inlineQuery(/^(?:anime|аниме) (.+)$/, async ctx => {
	const search = ctx.match[1].trim()
	const page = Number(ctx.inlineQuery.offset || 1)

	const animes = await searchAnime({
		search,
		page,
		limit: INLINE_MAX_RESULTS,
	})

	const results = animes.map(anime => {
		const name = anime.russian ?? anime.name
		let description = ''
		if (name !== anime.name) description = anime.name
		return InlineQueryResultBuilder.article(`anime ${anime.id}`, name, {
			description,
			reply_markup: new InlineKeyboard().text('Загрузка...', 'nop'),
			thumbnail_url: !anime.isCensored ? anime.poster?.previewUrl : undefined,
			url: anime.url,
		}).text(name)
	})

	await ctx.answerInlineQuery(results, {
		cache_time: CACHE_TIME,
		next_offset: nextOffset(page, results),
	})
})
