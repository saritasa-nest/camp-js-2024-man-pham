import { AnimeStatusEnum, AnimeTypeEnum } from '../enums/anime.enums';
import { TDateTimeRangeDto } from '../interfaces/datetime-range';

/** Anime DTO. */
export type TAnimeDto = {

	/** ID. */
	readonly id: number;

	/** Created date. */
	readonly created: string;

	/** Modified date. */
	readonly modified: string;

	/** English title. */
	readonly title_eng: string;

	/** Japanese title. */
	readonly title_jpn: string;

	/** Image URL. */
	readonly image: string;

	/** Aired duration. */
	readonly aired: TDateTimeRangeDto;

	/** Type. */
	readonly type: AnimeTypeEnum;

	/** Status. */
	readonly status: AnimeStatusEnum;

	/** Score. */
	readonly score: number;

	/** User score. */
	readonly user_score: number;

	/** List of studios. */
	readonly studios: readonly number[];

	/** List of genres. */
	readonly genres: readonly number[];
};
