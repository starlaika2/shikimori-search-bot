import { Composer, InlineKeyboard } from 'grammy'
import { getMangaInfo } from '#/shikimori/manga/executors'
import { makeMangaText } from '#/shikimori/manga/text'

export const mangaInfoHandler = new Composer()

mangaInfoHandler.chosenInlineResult(/^manga (\w+)$/, async ctx => {
	const id = ctx.match[1]
	const manga = await getMangaInfo({ ids: id })
	if (!manga) {
		await ctx.deleteMessage()
		return
	}

	const text = makeMangaText(manga)
	await ctx.editMessageText(text, {
		parse_mode: 'HTML',
		link_preview_options: {
			url: manga.poster?.originalUrl,
			show_above_text: true,
		},
		reply_markup: new InlineKeyboard()
			.switchInlineCurrent('Персонажи', `!manga characters ${id}`)
			.row()
			.url('Shikimori', manga.url),
	})
})
