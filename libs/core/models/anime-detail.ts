import { StrictOmit } from '../utils/types/strict-omit';

import { Anime } from './anime';
import { AnimeGenre } from './anime-genre';
import { AnimeRating } from './anime-rating';
import { AnimeSeason } from './anime-season';
import { AnimeSource } from './anime-source';
import { AnimeStudio } from './anime-studio';
import { OmitImmerable } from './immerable';

/** Anime details model. */
export class AnimeDetail extends Anime {

	/** YouTube trailer url. */
	public readonly trailerUrl: string;

	/** Rating. */
	public readonly rating: AnimeRating;

	/** Source. */
	public readonly source: AnimeSource;

	/** Season. */
	public readonly season: AnimeSeason;

	/** Synopsis. */
	public readonly synopsis: string;

	/** Airing status. */
	public readonly airingStatus: 'on air' | 'off air';

	/** Background. */
	public readonly background: string;

	/** Broadcast day. */
	public readonly broadcastDay: number;

	/** Broadcast time. */
	public readonly broadcastTime: string;

	/** Broadcast timezone. */
	public readonly broadcastTimezone: string;

	/** A list of anime studios. */
	public readonly studioList: readonly AnimeStudio[];

	/** A list of anime genres. */
	public readonly genreList: readonly AnimeGenre[];

	public constructor(data: TAnimeDetail) {
		super(data);
		this.trailerUrl = data.trailerUrl;
		this.rating = data.rating;
		this.source = data.source;
		this.season = data.season;
		this.synopsis = data.synopsis;
		this.airingStatus = data.airingStatus;
		this.studioList = data.studioList;
		this.genreList = data.genreList;
		this.background = data.background;
		this.broadcastDay = data.broadcastDay;
		this.broadcastTime = data.broadcastTime;
		this.broadcastTimezone = data.broadcastTimezone;
	}
}

/** Anime Type. */
type TAnimeDetail = StrictOmit<OmitImmerable<AnimeDetail>, 'imageDescription'>;
