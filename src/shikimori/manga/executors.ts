import { shikimori } from '#/utils/shikimori'

export const searchManga = shikimori('mangas', {
	variables: ['search', 'limit', 'page', 'kind'],
	parameters: { order: 'popularity' },
	fields: {
		id: true,
		russian: true,
		name: true,
		isCensored: true,
		url: true,
		poster: { previewUrl: true },
	},
})

export const getMangaInfo = shikimori('mangas', {
	variables: ['ids'],
	fields: {
		name: true,
		russian: true,
		isCensored: true,
		kind: true,
		volumes: true,
		chapters: true,
		status: true,
		airedOn: { day: true, month: true, year: true },
		releasedOn: { day: true, month: true, year: true },
		genres: { kind: true, russian: true },
		score: true,
		licensors: true,
		publishers: { name: true },
		descriptionHtml: true,
		descriptionSource: true,
		poster: { originalUrl: true },
		url: true,
	},
	transform: x => x.at(0),
})

export const getMangaCharacters = shikimori('mangas', {
	variables: ['ids'],
	fields: {
		characterRoles: {
			rolesRu: true,
			character: {
				id: true,
				russian: true,
				name: true,
				url: true,
				poster: { previewUrl: true },
			},
		},
	},
	transform: x =>
		x.at(0)?.characterRoles?.map(role => ({
			...role.character,
			isMain: role.rolesRu.includes('Main'),
		})),
})
