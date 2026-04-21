import { Composer } from 'grammy'
import { mangaCharactersHandler } from './characters'
import { mangaInfoHandler } from './info'
import { mangaSearchHandler } from './search'

export const mangaHandler = new Composer(
	mangaSearchHandler,
	mangaInfoHandler,
	mangaCharactersHandler,
)
