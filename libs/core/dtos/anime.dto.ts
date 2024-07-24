import { DateTimeRangeDto } from './datetime-range.dto';

import { AnimeStatusDto } from './anime-status.dto';
import { AnimeTypeDto } from './anime-type.dto';

/** Anime DTO. */
export type AnimeDto = Readonly<{

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
	aired: DateTimeRangeDto;

	/** Type. */
	type: AnimeTypeDto;

	/** Status. */
	status: AnimeStatusDto;

	/** Score. */
	score: number | null;

	/** User score. */
	user_score: number | null;

	/** List of studios. */
	studios: readonly number[];

	/** List of genres. */
	genres: readonly number[];
}>;
