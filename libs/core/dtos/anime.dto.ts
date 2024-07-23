import { TDateTimeRangeDto } from '../types/datetime-range';

import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';

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
	readonly type: AnimeTypeDto;

	/** Status. */
	readonly status: AnimeStatusDto;

	/** Score. */
	readonly score: number | null;

	/** User score. */
	readonly user_score: number | null;

	/** List of studios. */
	readonly studios: readonly number[];

	/** List of genres. */
	readonly genres: readonly number[];
};
