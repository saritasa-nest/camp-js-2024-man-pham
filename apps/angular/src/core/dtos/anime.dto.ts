import { AnimeStatusEnum, AnimeTypeEnum } from '../enums/anime-enums';
import { TDateTimeRange } from '../interfaces/datetime-range';

/** Anime DTO. */
export type TAnimeDto = {

	/** ID. */
	id: number;

	/** Created date. */
	created: string;

	/** Modified date. */
	modified: string;

	/** English title. */
	title_eng: string;

	/** Japanese title. */
	title_jpn: string;

	/** Image URL. */
	image: string;

	/** Aired duration. */
	aired: TDateTimeRange;

	/** Type. */
	type: AnimeTypeEnum;

	/** Status. */
	status: AnimeStatusEnum;

	/** Score. */
	score: number;

	/** User score. */
	user_score: number;

	/** List of studios. */
	studios: number[];

	/** List of genres. */
	genres: number[];
};
