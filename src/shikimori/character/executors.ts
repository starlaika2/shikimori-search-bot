import { shikimori } from '#/utils/shikimori'

export const searchCharacter = shikimori('characters', {
	variables: ['search', 'limit', 'page'],
	fields: {
		id: true,
		russian: true,
		name: true,
		url: true,
		poster: { previewUrl: true },
	},
})

export const getCharacterInfo = shikimori('characters', {
	variables: ['ids'],
	fields: {
		name: true,
		russian: true,
		japanese: true,
		synonyms: true,
		descriptionHtml: true,
		descriptionSource: true,
		poster: { originalUrl: true },
		url: true,
	},
	transform: x => x.at(0),
})
