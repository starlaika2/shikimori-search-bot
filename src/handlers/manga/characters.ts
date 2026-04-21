import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { INLINE_MAX_RESULTS } from '#/constants'
import { getMangaCharacters } from '#/shikimori/manga/executors'
import { nextOffset } from '#/utils/next-offset'

export const mangaCharactersHandler = new Composer()

mangaCharactersHandler.inlineQuery(/^!manga characters (\w+)$/, async ctx => {
	const id = ctx.match[1]
	const page = Number(ctx.inlineQuery.offset || 1)
	const characters = await getMangaCharacters({ ids: id })
	if (!characters) {
		await ctx.answerCallbackQuery('Ошибка: манга не найдена')
		return
	}

	const results = characters
		.sort((a, b) => {
			return a.isMain ? (b.isMain ? 0 : -1) : b.isMain ? 1 : 0
		})
		.slice(INLINE_MAX_RESULTS * (page - 1), INLINE_MAX_RESULTS * page)
		.map(char => {
			const title = char.russian ?? char.name
			const desc = title !== char.name ? `${char.name}\n` : ''
			return InlineQueryResultBuilder.article(`character ${char.id}`, title, {
				url: char.url,
				thumbnail_url: char.poster?.previewUrl,
				description: desc + (char.isMain ? 'Главный герой' : 'Второстепенный герой'),
				reply_markup: new InlineKeyboard().text('Загрузка...', 'nop'),
			}).text(title)
		})

	await ctx.answerInlineQuery(results, {
		next_offset: nextOffset(page, results),
	})
})
