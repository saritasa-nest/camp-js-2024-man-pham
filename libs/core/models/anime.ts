import { AnimeStatusEnum, AnimeTypeEnum } from '../enums/anime.enums';
import { TDateTimeRange } from '../interfaces/datetime-range';

import { Immerable, OmitImmerable } from './immerable';

/** Anime class. */
export class Anime extends Immerable {

	/** ID. */
	public readonly id: number;

	/** Created date. */
	public readonly createdDate: Date;

	/** Modified date. */
	public readonly modifiedDate: Date;

	/** English title. */
	public readonly titleEng: string;

	/** Japanese title. */
	public readonly titleJpn: string;

	/** Image URL. */
	public readonly image: string;

	/** Id. */
	public readonly aired: TDateTimeRange;

	/** Type. */
	public readonly type: AnimeTypeEnum;

	/** Status. */
	public readonly status: AnimeStatusEnum;

	/** Score. */
	public readonly score: number | null;

	/** User score. */
	public readonly userScore: number | null;

	/** List of studios. */
	public readonly studios: readonly number[];

	/** List of genres. */
	public readonly genres: readonly number[];

	public constructor(
		data: TAnime,
	) {
		super();
		this.id = data.id;
		this.createdDate = data.createdDate;
		this.modifiedDate = data.modifiedDate;
		this.titleEng = data.titleEng;
		this.titleJpn = data.titleJpn;
		this.image = data.image;
		this.aired = data.aired;
		this.type = data.type;
		this.status = data.status;
		this.score = data.score;
		this.userScore = data.userScore;
		this.studios = data.studios;
		this.genres = data.genres;
	}
}

/** Anime Type. */
export type TAnime = OmitImmerable<Anime>;
