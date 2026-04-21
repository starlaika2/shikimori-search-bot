/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: schema */
import {
	boolean,
	coerce,
	enum as enum_,
	float32,
	int,
	lazy,
	type output as Output,
	object,
	string,
} from 'zod/v4'

export const AnimeKindString = string()
export const AnimeStatusString = string()
export const DurationString = string()
export const MangaKindString = string()
export const MangaStatusString = string()
export const MylistString = string()
export const OriginString = string()
export const RatingString = string()
export const SeasonString = string()

export const Int = int()
export const Float = float32()
export const String = string()
export const Boolean = boolean()
export const ID = String
export const ISO8601Date = coerce.date()
export const ISO8601DateTime = coerce.date()
export const PositiveInt = int().positive()

export type Anime = Output<typeof Anime>
const Anime = object({
	get airedOn() {
		return IncompleteDate.nullish()
	},
	get characterRoles() {
		return CharacterRole.array().nullish()
	},
	get chronology() {
		return Anime.array().nullish()
	},
	createdAt: ISO8601DateTime,
	description: String.nullish(),
	descriptionHtml: String.nullish(),
	descriptionSource: String.nullish(),
	duration: Int.nullish(),
	english: String.nullish(),
	episodes: Int,
	episodesAired: Int,
	get externalLinks() {
		return ExternalLink.array().nullish()
	},
	fandubbers: String.array(),
	fansubbers: String.array(),
	franchise: String.nullish(),
	get genres() {
		return Genre.array().nullish()
	},
	id: ID,
	isCensored: Boolean.nullish(),
	japanese: String.nullish(),
	get kind() {
		return AnimeKindEnum.nullish()
	},
	licenseNameRu: String.nullish(),
	licensors: String.array().nullish(),
	malId: ID.nullish(),
	name: String,
	nextEpisodeAt: ISO8601DateTime.nullish(),
	opengraphImageUrl: String.nullish(),
	get origin() {
		return AnimeOriginEnum.nullish()
	},
	get personRoles() {
		return PersonRole.array().nullish()
	},
	get poster() {
		return Poster.nullish()
	},
	get rating() {
		return AnimeRatingEnum.nullish()
	},
	get related() {
		return Related.array().nullish()
	},
	get releasedOn() {
		return IncompleteDate.nullish()
	},
	russian: String.nullish(),
	score: Float.nullish(),
	get scoresStats() {
		return ScoreStat.array().nullish()
	},
	get screenshots() {
		return Screenshot.array()
	},
	season: String.nullish(),
	status: lazy(() => AnimeStatusEnum).nullish(),
	get statusesStats() {
		return StatusStat.array().nullish()
	},
	get studios() {
		return Studio.array()
	},
	synonyms: String.array(),
	get topic() {
		return Topic.nullish()
	},
	updatedAt: ISO8601DateTime,
	url: String,
	get userRate() {
		return UserRate.nullish()
	},
	get videos() {
		return Video.array()
	},
})

export type AnimeKindEnum = Output<typeof AnimeKindEnum>
export const AnimeKindEnum = enum_([
	'tv',
	'movie',
	'ova',
	'ona',
	'special',
	'tv_special',
	'music',
	'pv',
	'cm',
])

export type AnimeOriginEnum = Output<typeof AnimeOriginEnum>
export const AnimeOriginEnum = enum_([
	'original',
	'manga',
	'web_manga',
	'four_koma_manga',
	'novel',
	'web_novel',
	'visual_novel',
	'light_novel',
	'game',
	'card_game',
	'music',
	'radio',
	'book',
	'picture_book',
	'mixed_media',
	'other',
	'unknown',
])

export type AnimeRatingEnum = Output<typeof AnimeRatingEnum>
export const AnimeRatingEnum = enum_(['none', 'g', 'pg', 'pg_13', 'r', 'r_plus', 'rx'])

export type AnimeStatusEnum = Output<typeof AnimeStatusEnum>
export const AnimeStatusEnum = enum_(['anons', 'ongoing', 'released'])

export type Character = Output<typeof Character>
export const Character = object({
	createdAt: ISO8601DateTime,
	description: String.nullish(),
	descriptionHtml: String.nullish(),
	descriptionSource: String.nullish(),
	id: ID,
	isAnime: Boolean,
	isManga: Boolean,
	isRanobe: Boolean,
	japanese: String.nullish(),
	malId: ID.nullish(),
	name: String,
	get poster() {
		return Poster.nullish()
	},
	russian: String.nullish(),
	synonyms: String.array(),
	get topic() {
		return Topic.nullish()
	},
	updatedAt: ISO8601DateTime,
	url: String,
})

export type CharacterRole = Output<typeof CharacterRole>
export const CharacterRole = object({
	character: Character,
	id: ID,
	rolesEn: String.array(),
	rolesRu: String.array(),
})

export type Contest = Output<typeof Contest>
export const Contest = object({
	description: String.nullish(),
	descriptionHtml: String.nullish(),
	descriptionSource: String.nullish(),
	finishedOn: ISO8601Date.nullish(),
	id: ID,
	matchDuration: Int.nullish(),
	matchesInterval: Int.nullish(),
	matchesPerRound: Int.nullish(),
	get memberType() {
		return ContestMemberTypeEnum
	},
	name: String,
	get rounds() {
		return ContestRound.array()
	},
	startedOn: ISO8601Date.nullish(),
	get state() {
		return ContestStateEnum
	},
	get strategyType() {
		return ContestStrategyTypeEnum
	},
})

export type ContestMatch = Output<typeof ContestMatch>
export const ContestMatch = object({
	id: ID,
	get leftAnime() {
		return Anime.nullish()
	},
	get leftCharacter() {
		return Character.nullish()
	},
	leftId: Int.nullish(),
	leftVotes: Int.nullish(),
	get rightAnime() {
		return Anime.nullish()
	},
	get rightCharacter() {
		return Character.nullish()
	},
	rightId: Int.nullish(),
	rightVotes: Int.nullish(),
	get state() {
		return ContestMatchStateEnum
	},
	winnerId: Int.nullish(),
})

export type ContestMatchStateEnum = Output<typeof ContestMatchStateEnum>
export const ContestMatchStateEnum = enum_(['created', 'started', 'freezed', 'finished'])

export type ContestMemberTypeEnum = Output<typeof ContestMemberTypeEnum>
export const ContestMemberTypeEnum = enum_(['anime', 'character'])

export type ContestRound = Output<typeof ContestRound>
export const ContestRound = object({
	id: ID,
	isAdditional: Boolean,
	get matches() {
		return ContestMatch.array()
	},
	name: String,
	number: Int,
	get state() {
		return ContestRoundStateEnum
	},
})

export type ContestRoundStateEnum = Output<typeof ContestRoundStateEnum>
export const ContestRoundStateEnum = enum_(['created', 'started', 'finished'])

export type ContestStateEnum = Output<typeof ContestStateEnum>
export const ContestStateEnum = enum_(['created', 'proposing', 'started', 'finished'])

export type ContestStrategyTypeEnum = Output<typeof ContestStrategyTypeEnum>
export const ContestStrategyTypeEnum = enum_(['double_elimination', 'play_off', 'swiss'])

export type ExternalLink = Output<typeof ExternalLink>
export const ExternalLink = object({
	createdAt: ISO8601DateTime.nullish(),
	id: ID.nullish(),
	get kind() {
		return ExternalLinkKindEnum
	},
	updatedAt: ISO8601DateTime.nullish(),
	url: String,
})

export type ExternalLinkKindEnum = Output<typeof ExternalLinkKindEnum>
export const ExternalLinkKindEnum = enum_([
	'official_site',
	'wikipedia',
	'anime_news_network',
	'myanimelist',
	'anime_db',
	'world_art',
	'kinopoisk',
	'kage_project',
	'twitter',
	'smotret_anime',
	'shiki',
	'amediateka',
	'crunchyroll',
	'amazon',
	'hidive',
	'hulu',
	'ivi',
	'kinopoisk_hd',
	'wink',
	'netflix',
	'okko',
	'youtube',
	'remanga',
	'mangalib',
	'mangaupdates',
	'readmanga',
	'mangadex',
	'mangafox',
	'mangachan',
	'mangahub',
	'novel_tl',
	'ruranobe',
	'ranobelib',
	'novelupdates',
])

export type Genre = Output<typeof Genre>
export const Genre = object({
	get entryType() {
		return GenreEntryTypeEnum
	},
	id: ID,
	get kind() {
		return GenreKindEnum
	},
	name: String,
	russian: String,
})

export type GenreEntryTypeEnum = Output<typeof GenreEntryTypeEnum>
export const GenreEntryTypeEnum = enum_(['Anime', 'Manga'])

export type GenreKindEnum = Output<typeof GenreKindEnum>
export const GenreKindEnum = enum_(['demographic', 'genre', 'theme'])

export type IncompleteDate = Output<typeof IncompleteDate>
export const IncompleteDate = object({
	date: ISO8601Date.nullish(),
	day: Int.nullish(),
	month: Int.nullish(),
	year: Int.nullish(),
})

export type Manga = Output<typeof Manga>
export const Manga = object({
	get airedOn() {
		return IncompleteDate.nullish()
	},
	chapters: Int,
	get characterRoles() {
		return CharacterRole.array().nullish()
	},
	get chronology() {
		return Manga.array().nullish()
	},
	createdAt: ISO8601DateTime,
	description: String.nullish(),
	descriptionHtml: String.nullish(),
	descriptionSource: String.nullish(),
	english: String.nullish(),
	get externalLinks() {
		return ExternalLink.array().nullish()
	},
	franchise: String.nullish(),
	get genres() {
		return Genre.array().nullish()
	},
	id: ID,
	isCensored: Boolean.nullish(),
	japanese: String.nullish(),
	get kind() {
		return MangaKindEnum.nullish()
	},
	licenseNameRu: String.nullish(),
	licensors: String.array().nullish(),
	malId: ID.nullish(),
	name: String,
	opengraphImageUrl: String.nullish(),
	get personRoles() {
		return PersonRole.array().nullish()
	},
	get poster() {
		return Poster.nullish()
	},
	get publishers() {
		return Publisher.array()
	},
	get related() {
		return Related.array().nullish()
	},
	get releasedOn() {
		return IncompleteDate.nullish()
	},
	russian: String.nullish(),
	score: Float.nullish(),
	get scoresStats() {
		return ScoreStat.array().nullish()
	},
	get status() {
		return MangaStatusEnum.nullish()
	},
	get statusesStats() {
		return StatusStat.array().nullish()
	},
	synonyms: String.array(),
	get topic() {
		return Topic.nullish()
	},
	updatedAt: ISO8601DateTime,
	url: String,
	get userRate() {
		return UserRate.nullish()
	},
	volumes: Int,
})

export type MangaKindEnum = Output<typeof MangaKindEnum>
export const MangaKindEnum = enum_([
	'manga',
	'manhwa',
	'manhua',
	'light_novel',
	'novel',
	'one_shot',
	'doujin',
])

export type MangaStatusEnum = Output<typeof MangaStatusEnum>
export const MangaStatusEnum = enum_(['anons', 'ongoing', 'released', 'paused', 'discontinued'])

export type OrderEnum = Output<typeof OrderEnum>
export const OrderEnum = enum_([
	'id',
	'id_desc',
	'ranked',
	'kind',
	'popularity',
	'name',
	'aired_on',
	'episodes',
	'status',
	'random',
	'ranked_random',
	'ranked_shiki',
	'created_at',
	'created_at_desc',
	'updated_at',
	'updated_at_desc',
])

export type Person = Output<typeof Person>
export const Person = object({
	get birthOn() {
		return IncompleteDate.nullish()
	},
	createdAt: ISO8601DateTime,
	get deceasedOn() {
		return IncompleteDate.nullish()
	},
	id: ID,
	isMangaka: Boolean,
	isProducer: Boolean,
	isSeyu: Boolean,
	japanese: String.nullish(),
	malId: ID.nullish(),
	name: String,
	get poster() {
		return Poster.nullish()
	},
	russian: String.nullish(),
	synonyms: String.array(),
	get topic() {
		return Topic.nullish()
	},
	updatedAt: ISO8601DateTime,
	url: String,
	website: String,
})

export type PersonRole = Output<typeof PersonRole>
export const PersonRole = object({
	id: ID,
	get person() {
		return Person
	},
	rolesEn: String.array(),
	rolesRu: String.array(),
})

export type Poster = Output<typeof Poster>
export const Poster = object({
	id: ID,
	main2xUrl: String,
	mainAlt2xUrl: String,
	mainAltUrl: String,
	mainUrl: String,
	mini2xUrl: String,
	miniAlt2xUrl: String,
	miniAltUrl: String,
	miniUrl: String,
	originalUrl: String,
	preview2xUrl: String,
	previewAlt2xUrl: String,
	previewAltUrl: String,
	previewUrl: String,
})

export type Publisher = Output<typeof Publisher>
export const Publisher = object({
	id: ID,
	name: String,
})

export type Related = Output<typeof Related>
export const Related = object({
	get anime() {
		return Anime.nullish()
	},
	id: ID,
	get manga() {
		return Manga.nullish()
	},
	get relationKind() {
		return RelationKindEnum
	},
	relationText: String,
})

export type RelationKindEnum = Output<typeof RelationKindEnum>
export const RelationKindEnum = enum_([
	'adaptation',
	'alternative_setting',
	'alternative_version',
	'character',
	'full_story',
	'other',
	'parent_story',
	'prequel',
	'sequel',
	'side_story',
	'spin_off',
	'summary',
])

export type ScoreStat = Output<typeof ScoreStat>
export const ScoreStat = object({
	count: Int,
	score: Int,
})

export type Screenshot = Output<typeof Screenshot>
export const Screenshot = object({
	id: ID,
	originalUrl: String,
	x166Url: String,
	x332Url: String,
})

export type SortOrderEnum = Output<typeof SortOrderEnum>
export const SortOrderEnum = enum_(['asc', 'desc'])

export type StatusStat = Output<typeof StatusStat>
export const StatusStat = object({
	count: Int,
	get status() {
		return UserRateStatusEnum
	},
})

export type Studio = Output<typeof Studio>
export const Studio = object({
	id: ID,
	imageUrl: String.nullish(),
	name: String,
})

export type Topic = Output<typeof Topic>
export const Topic = object({
	body: String,
	commentsCount: Int,
	createdAt: ISO8601DateTime,
	htmlBody: String,
	id: ID.nullish(),
	tags: String.array(),
	title: String,
	type: String,
	updatedAt: ISO8601DateTime,
	url: String,
})

export type User = Output<typeof User>
export const User = object({
	avatarUrl: String,
	id: ID,
	lastOnlineAt: ISO8601DateTime,
	nickname: String,
	url: String,
})

export type UserRate = Output<typeof UserRate>
export const UserRate = object({
	get anime() {
		return Anime.nullish()
	},
	chapters: Int,
	createdAt: ISO8601DateTime,
	episodes: Int,
	id: ID,
	get manga() {
		return Manga.nullish()
	},
	rewatches: Int,
	score: Int,
	get status() {
		return UserRateStatusEnum
	},
	text: String.nullish(),
	updatedAt: ISO8601DateTime,
	volumes: Int,
})

export type UserRateOrderFieldEnum = Output<typeof UserRateOrderFieldEnum>
export const UserRateOrderFieldEnum = enum_(['id', 'updated_at'])

export type UserRateStatusEnum = Output<typeof UserRateStatusEnum>
export const UserRateStatusEnum = enum_([
	'planned',
	'watching',
	'rewatching',
	'completed',
	'on_hold',
	'dropped',
])

export type UserRateTargetTypeEnum = Output<typeof UserRateTargetTypeEnum>
export const UserRateTargetTypeEnum = enum_(['Anime', 'Manga'])

export type Video = Output<typeof Video>
export const Video = object({
	id: ID,
	imageUrl: String,
	get kind() {
		return VideoKindEnum
	},
	name: String.nullish(),
	playerUrl: String,
	url: String,
})

export type VideoKindEnum = Output<typeof VideoKindEnum>
export const VideoKindEnum = enum_([
	'pv',
	'character_trailer',
	'cm',
	'op',
	'ed',
	'op_ed_clip',
	'clip',
	'other',
	'episode_preview',
])

export type UserRateOrderInputType = Output<typeof UserRateOrderInputType>
export const UserRateOrderInputType = object({
	get field() {
		return UserRateOrderFieldEnum
	},
	get order() {
		return SortOrderEnum
	},
})

export const Query = {
	animes: {
		types: {
			page: 'PositiveInt',
			limit: 'PositiveInt',
			order: 'OrderEnum',
			kind: 'AnimeStatusString',
			status: 'AnimeStatusString',
			season: 'SeasonString',
			score: 'Int',
			duration: 'DurationString',
			rating: 'RatingString',
			origin: 'OriginString',
			genre: 'String',
			studio: 'String',
			franchise: 'String',
			censored: 'Boolean',
			mylist: 'MylistString',
			ids: 'String',
			excludeIds: 'String',
			search: 'String',
		},
		parameters: object({
			page: PositiveInt.default(1),
			limit: PositiveInt.max(50).default(2),
			order: OrderEnum.default('ranked'),
			kind: AnimeKindString.nullish(),
			status: AnimeStatusString.nullish(),
			season: SeasonString.nullish(),
			score: Int.nullish(),
			duration: DurationString.nullish(),
			rating: RatingString.nullish(),
			origin: OriginString.nullish(),
			genre: String.nullish(),
			studio: String.nullish(),
			franchise: String.nullish(),
			censored: Boolean.nullish(),
			mylist: MylistString.nullish(),
			ids: String.nullish(),
			excludeIds: String.nullish(),
			search: String.nullish(),
		}),
		returns: Anime.array(),
	},
	characters: {
		types: {
			page: 'PositiveInt',
			limit: 'PositiveInt',
			ids: 'String',
			search: 'String',
		},
		parameters: object({
			page: PositiveInt.default(1),
			limit: PositiveInt.max(50).default(2),
			ids: String.nullish(),
			search: String.nullish(),
		}),
		returns: Character.array(),
	},
	contests: {
		types: {
			page: 'PositiveInt',
			limit: 'PositiveInt',
			ids: '[ID!]',
		},
		parameters: object({
			page: PositiveInt.default(1),
			limit: PositiveInt.max(10).default(2),
			ids: ID.array().nullish(),
		}),
		returns: Contest.array(),
	},
	currentUser: {
		types: {},
		parameters: {},
		returns: User,
	},
	genres: {
		types: {
			entryType: 'GenreEntryTypeEnum!',
		},
		parameters: object({
			entryType: GenreEntryTypeEnum,
		}),
		returns: Genre.array(),
	},
	mangas: {
		types: {
			page: 'PositiveInt',
			limit: 'PositiveInt',
			order: 'OrderEnum',
			kind: 'MangaStatusString',
			status: 'MangaStatusString',
			season: 'SeasonString',
			score: 'Int',
			genre: 'String',
			publisher: 'String',
			franchise: 'String',
			mylist: 'MylistString',
			ids: 'String',
			excludeIds: 'String',
			search: 'String',
		},
		parameters: object({
			page: PositiveInt.default(1),
			limit: PositiveInt.max(50).default(2),
			order: OrderEnum.default('ranked'),
			kind: MangaStatusString.nullish(),
			status: MangaStatusString.nullish(),
			season: SeasonString.nullish(),
			score: Int.nullish(),
			genre: String.nullish(),
			publisher: String.nullish(),
			franchise: String.nullish(),
			mylist: MylistString.nullish(),
			ids: String.nullish(),
			excludeIds: String.nullish(),
			search: String.nullish(),
		}),
		returns: Manga.array(),
	},
	people: {
		types: {
			page: 'PositiveInt',
			limit: 'PositiveInt',
			ids: '[ID!]',
			search: 'String',
			isSeyu: 'Boolean',
			isProducer: 'Boolean',
			isMangaka: 'Boolean',
		},
		parameters: object({
			page: PositiveInt.default(1),
			limit: PositiveInt.max(50).default(2),
			ids: ID.array().nullish(),
			search: String.nullish(),
			isSeyu: Boolean.nullish(),
			isProducer: Boolean.nullish(),
			isMangaka: Boolean.nullish(),
		}),
		returns: Person.array(),
	},
	userRates: {
		types: {
			page: 'PositiveInt',
			limit: 'PositiveInt',
			userId: 'ID',
			targetType: 'UserRateTargetTypeEnum',
			status: 'UserRateStatusEnum',
			order: 'UserRateOrderInputType',
		},
		parameters: object({
			page: PositiveInt.default(1),
			limit: PositiveInt.max(50).default(2),
			userId: ID.nullish(),
			targetType: UserRateTargetTypeEnum.nullish(),
			status: UserRateStatusEnum.nullish(),
			order: UserRateOrderInputType.nullish(),
		}),
		returns: UserRate.array(),
	},
	users: {
		types: {
			page: 'PositiveInt',
			limit: 'PositiveInt',
			ids: '[ID!]',
			search: 'String',
		},
		parameters: object({
			page: PositiveInt.default(1),
			limit: PositiveInt.max(50).default(2),
			ids: ID.array().nullish(),
			search: String.nullish(),
		}),
		returns: User.array(),
	},
}
