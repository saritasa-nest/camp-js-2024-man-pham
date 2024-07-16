import { AnimeStatusEnum, AnimeTypeEnum } from '../enums/anime-enums';
import { TDateTimeRange } from '../interfaces/datetime-range';

/** Represents anime. */
export type TAnime = {

	/** ID. */
	readonly id: number;

	/** Created date. */
	readonly createdDate: string;

	/** Modified date. */
	readonly modifiedDate: string;

	/** English title. */
	readonly titleEng: string;

	/** Japanese title. */
	readonly titleJpn: string;

	/** Image URL. */
	readonly image: string;

	/** Id. */
	readonly aired: TDateTimeRange;

	/** Aired duration. */
	readonly type: AnimeTypeEnum;

	/** Type. */
	readonly status: AnimeStatusEnum;

	/** Status. */
	/** Score. */
	readonly score: number;

	/** User score. */
	readonly userScore: number;

	/** List of studios. */
	readonly studios: number[];

	/** List of genres. */
	readonly genres: number[];
};
