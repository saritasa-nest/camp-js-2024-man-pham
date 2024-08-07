import { StrictOmit } from './../utils/types/strict-omit';
import { DateTimeRange } from './datetime-range';

import { AnimeStatus } from './anime-status';
import { AnimeType } from './anime-type';

import { Immerable, OmitImmerable } from './immerable';

const ANIME_IMAGE_FALLBACK_DESCRIPTION = 'Anime image';

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
	public readonly aired: DateTimeRange;

	/** Type. */
	public readonly type: AnimeType;

	/** Status. */
	public readonly status: AnimeStatus;

	/** Score. */
	public readonly score: number | null;

	/** User score. */
	public readonly userScore: number | null;

	/** List of studios. */
	public readonly studios: readonly number[];

	/** List of genres. */
	public readonly genres: readonly number[];

	/** Get description for anime image. */
	public get imageDescription(): string {
		return this.titleEng || this.titleJpn || ANIME_IMAGE_FALLBACK_DESCRIPTION;
	}

	public constructor(data: TAnime) {
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
type TAnime = StrictOmit<OmitImmerable<Anime>, 'imageDescription'>;
