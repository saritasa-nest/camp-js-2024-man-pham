import { Injectable } from '@angular/core';

import { Anime, TAnime } from '../models/anime';
import { TAnimeDto } from '../dtos/anime.dto';

/** Auth mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper {

	/** @inheritdoc */
	public fromDto(data: TAnimeDto): TAnime {
		return new Anime({
			id: data.id,
			createdDate: data.created,
			modifiedDate: data.modified,
			titleEng: data.title_eng,
			titleJpn: data.title_jpn,
			image: data.image,
			aired: data.aired,
			type: data.type,
			status: data.status,
			score: data.score,
			userScore: data.user_score,
			studios: data.studios,
			genres: data.genres,
		});
	}
}
