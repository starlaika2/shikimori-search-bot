import { shikimori } from '#/utils/shikimori'

export const searchAnime = shikimori('animes', {
	variables: ['search', 'limit', 'page'],
	parameters: { order: 'popularity' },
	fields: {
		id: true,
		russian: true,
		name: true,
		isCensored: true,
		url: true,
		poster: {
			previewUrl: true,
		},
	},
})

export const getAnimeInfo = shikimori('animes', {
	variables: ['ids'],
	fields: {
		name: true,
		russian: true,
		isCensored: true,
		kind: true,
		status: true,
		episodes: true,
		episodesAired: true,
		nextEpisodeAt: true,
		duration: true,
		airedOn: { day: true, month: true, year: true },
		releasedOn: { day: true, month: true, year: true },
		genres: { kind: true, russian: true },
		rating: true,
		score: true,
		origin: true,
		licensors: true,
		studios: { name: true },
		fandubbers: true,
		fansubbers: true,
		descriptionHtml: true,
		descriptionSource: true,
		poster: { originalUrl: true },
		url: true,
	},
	transform: x => x.at(0),
})

export const getAnimeCharacters = shikimori('animes', {
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

export const getAnimeScreenshots = shikimori('animes', {
	variables: ['ids'],
	fields: {
		screenshots: {
			id: true,
			originalUrl: true,
		},
	},
	transform: x => x.at(0)?.screenshots,
})

export const getAnimeVideos = shikimori('animes', {
	variables: ['ids'],
	fields: {
		videos: {
			id: true,
			kind: true,
			name: true,
			imageUrl: true,
			url: true,
		},
	},
	transform: x => x.at(0)?.videos,
})
