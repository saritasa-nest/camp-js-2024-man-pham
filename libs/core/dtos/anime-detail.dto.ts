import { AnimeGenreDto } from './anime-genre.dto';
import { AnimeRatingDto } from './anime-rating.dto';
import { AnimeSeasonDto } from './anime-season.dto';
import { AnimeSourceDto } from './anime-source.dto';
import { AnimeStudioDto } from './anime-studio.dto';
import { AnimeDto } from './anime.dto';

/** Anime detail DTO. */
export type AnimeDetailDto = AnimeDto & {

	/** YouTube trailer id. */
	readonly trailer_youtube_id: string;

	/** Airing status. */
	readonly airing: boolean;

	/** Rating. */
	readonly rating: AnimeRatingDto;

	/** Season. */
	readonly season: AnimeSeasonDto;

	/** Source. */
	readonly source: AnimeSourceDto;

	/** Synopsis. */
	readonly synopsis: string;

	/** Background. */
	readonly background: string;

	/** Broadcast day. */
	readonly broadcast_day: number;

	/** Broadcast time. */
	readonly broadcast_time: string;

	/** Broadcast timezone. */
	readonly broadcast_timezone: string;

	/** List of studio DTOs. */
	readonly studios_data: readonly AnimeStudioDto[];

	/** List of genre DTOs. */
	readonly genres_data: readonly AnimeGenreDto[];
};
