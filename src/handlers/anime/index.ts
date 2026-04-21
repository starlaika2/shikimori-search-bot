import { Composer } from 'grammy'
import { animeCharactersHandler } from './characters'
import { animeInfoHandler } from './info'
import { animeScreenshotsHandler } from './screenshots'
import { animeSearchHandler } from './search'
import { animeVideosHandler } from './videos'

export const animeHandler = new Composer(
	animeSearchHandler,
	animeInfoHandler,
	animeCharactersHandler,
	animeScreenshotsHandler,
	animeVideosHandler,
)
