import escapeHTML from 'escape-html'
import { Composer, InlineKeyboard } from 'grammy'

export const helpHandler = new Composer()

const HELP = `\
<b>Shikimori Search Bot</b> — бот для поиска аниме/манги/персонажей из <a href="https://shikimori.io">Шикимори</a>

Использование — инлайн-режим:
@%s ${escapeHTML('<команда>')}

<b>Поиск аниме</b>
anime [запрос]
аниме [запрос]

<b>Поиск манги</b>
manga [запрос]
манга [запрос]

<b>Поиск ранобэ</b>
ranobe [запрос]
ранобэ [запрос]

<b>Поиск персонажа</b>
character [запрос]
персонаж [запрос]`

helpHandler.command(['start', 'help'], async ctx => {
	const text = HELP.replace('%s', ctx.me.username)
	await ctx.reply(text, {
		parse_mode: 'HTML',
		link_preview_options: {
			is_disabled: true,
		},
		reply_markup: new InlineKeyboard().switchInlineCurrent('Поиск', ''),
	})
})
