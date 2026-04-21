import { Composer, InlineKeyboard } from 'grammy'
import { getCharacterInfo } from '#/shikimori/character/executors'
import { makeCharacterText } from '#/shikimori/character/text'

export const characterInfoHandler = new Composer()

characterInfoHandler.chosenInlineResult(/^character (\w+)$/, async ctx => {
	const id = ctx.match[1]
	const character = await getCharacterInfo({ ids: id })
	if (!character) {
		await ctx.deleteMessage()
		return
	}

	const text = makeCharacterText(character)
	await ctx.editMessageText(text, {
		parse_mode: 'HTML',
		link_preview_options: {
			url: character.poster?.originalUrl,
			show_above_text: true,
		},
		reply_markup: new InlineKeyboard().url('Shikimori', character.url),
	})
})
