import { Composer, InlineKeyboard } from 'grammy'
import { getAnimeInfo } from '#/shikimori/anime/executors'
import { makeAnimeText } from '#/shikimori/anime/text'

export const animeInfoHandler = new Composer()

animeInfoHandler.chosenInlineResult(/^anime (\w+)$/, async ctx => {
	const id = ctx.match[1]
	const anime = await getAnimeInfo({ ids: id })
	if (!anime) {
		await ctx.deleteMessage()
		return
	}

	const text = makeAnimeText(anime)
	await ctx.editMessageText(text, {
		parse_mode: 'HTML',
		link_preview_options: {
			url: anime.poster?.originalUrl,
			show_above_text: true,
		},
		reply_markup: new InlineKeyboard()
			.switchInlineCurrent('Персонажи', `!anime characters ${id}`)
			.row()
			.switchInlineCurrent('Скриншоты', `!anime screenshots ${id}`)
			.switchInlineCurrent('Видео', `!anime videos ${id}`)
			.row()
			.url('Шикимори', anime.url),
	})
})
