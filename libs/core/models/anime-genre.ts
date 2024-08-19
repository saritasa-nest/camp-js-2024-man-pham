
import { Immerable, OmitImmerable } from './immerable';

/** Anime genre. */
export class AnimeGenre extends Immerable {

	/** Id. */
	public readonly id: number;

	/** Name. */
	public readonly name: string;

	/** Created date. */
	public readonly createdDate: Date;

	/** Modified date. */
	public readonly modifiedDate: Date;

	/** Type. */
	public readonly type: string;

	public constructor(data: TAnimeGenre) {
		super();
		this.id = data.id;
		this.name = data.name;
		this.createdDate = data.createdDate;
		this.modifiedDate = data.modifiedDate;
		this.type = data.type;
	}
}

type TAnimeGenre = OmitImmerable<AnimeGenre>;
