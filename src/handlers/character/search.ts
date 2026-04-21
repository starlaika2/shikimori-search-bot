import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { INLINE_MAX_RESULTS } from '#/constants'
import { searchCharacter } from '#/shikimori/character/executors'
import { nextOffset } from '#/utils/next-offset'

export const characterSearchHandler = new Composer()

characterSearchHandler.inlineQuery(/^(?:character|персонаж) (.+)$/, async ctx => {
	const search = ctx.match[1].trim()
	const page = Number(ctx.inlineQuery.offset || 1)

	const characters = await searchCharacter({
		search,
		page,
		limit: INLINE_MAX_RESULTS,
	})

	const results = characters.map(character => {
		const name = character.russian ?? character.name
		let description = ''
		if (name !== character.name) description = character.name
		return InlineQueryResultBuilder.article(`character ${character.id}`, name, {
			description,
			reply_markup: new InlineKeyboard().text('Загрузка...', 'nop'),
			thumbnail_url: character.poster?.previewUrl,
			url: character.url,
		}).text(name)
	})

	await ctx.answerInlineQuery(results, {
		next_offset: nextOffset(page, results),
	})
})
