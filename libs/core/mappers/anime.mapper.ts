import { Injectable } from '@angular/core';

import { Anime, TAnime } from '../models/anime';
import { TAnimeDto } from '../dtos/anime.dto';
import { TMapper } from '../interfaces/mapper';

/** Anime mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper implements TMapper<TAnimeDto, TAnime> {

	/** @inheritdoc */
	public fromDto(data: TAnimeDto): TAnime {
		return new Anime({
			id: data.id,
			createdDate: new Date(data.created),
			modifiedDate: new Date(data.modified),
			titleEng: data.title_eng,
			titleJpn: data.title_jpn,
			image: data.image,
			aired: {
				startDate: new Date(data.aired.start),
				endDate: new Date(data.aired.end),
			},
			type: data.type,
			status: data.status,
			score: data.score,
			userScore: data.user_score,
			studios: data.studios,
			genres: data.genres,
		});
	}

	/** @inheritdoc */
	public toDto(data: TAnime): TAnimeDto {
		return {
			id: data.id,
			created: data.createdDate.toISOString(),
			modified: data.modifiedDate.toISOString(),
			title_eng: data.titleEng,
			title_jpn: data.titleJpn,
			image: data.image,
			aired: {
				start: data.aired.startDate.toISOString(),
				end: data.aired.endDate.toISOString(),
			},
			type: data.type,
			status: data.status,
			score: data.score,
			user_score: data.userScore,
			studios: data.studios,
			genres: data.genres,
		};
	}
}
