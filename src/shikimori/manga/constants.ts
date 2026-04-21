import type { MangaKindEnum, MangaStatusEnum } from '#/shikimori/schema'

export const MANGA_KIND: Record<MangaKindEnum, string> = {
	doujin: 'Додзинси',
	light_novel: 'Ранобэ',
	manga: 'Манга',
	manhua: 'Маньхуа',
	manhwa: 'Манхва',
	novel: 'Новелла',
	one_shot: 'Ваншот',
}

export const MANGA_STATUS: Record<MangaStatusEnum, string> = {
	anons: 'анонс',
	discontinued: 'прекращено',
	ongoing: 'выходит',
	paused: 'приостановлено',
	released: 'издано',
}
