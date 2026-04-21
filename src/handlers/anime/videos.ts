import { Composer, InlineQueryResultBuilder } from 'grammy'
import { INLINE_MAX_RESULTS } from '#/constants'
import { getAnimeVideos } from '#/shikimori/anime/executors'
import { VIDEO_KIND } from '#/shikimori/constants'
import { nextOffset } from '#/utils/next-offset'

export const animeVideosHandler = new Composer()

animeVideosHandler.inlineQuery(/^!anime videos (\w+)$/, async ctx => {
	const id = ctx.match[1]
	const page = Number(ctx.inlineQuery.offset || 1)
	const videos = await getAnimeVideos({ ids: id })
	if (!videos) {
		await ctx.answerCallbackQuery('Ошибка: аниме не найдено')
		return
	}

	const results = videos
		.filter(video => video.kind !== 'episode_preview')
		.slice(INLINE_MAX_RESULTS * (page - 1), INLINE_MAX_RESULTS * page)
		.map(video => {
			const title = video.name || VIDEO_KIND[video.kind]
			const imageUrl = `https:${video.imageUrl}`
			return InlineQueryResultBuilder.videoHtml(`video ${video.id}`, title, video.url, imageUrl, {
				description: video.url,
			}).text(`${title}\n${video.url}`)
		})

	await ctx.answerInlineQuery(results, {
		next_offset: nextOffset(page, results),
	})
})
