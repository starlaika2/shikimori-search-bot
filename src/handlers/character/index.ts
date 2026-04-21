import { Composer } from 'grammy'
import { characterInfoHandler } from './info'
import { characterSearchHandler } from './search'

export const characterHandler = new Composer(characterSearchHandler, characterInfoHandler)
