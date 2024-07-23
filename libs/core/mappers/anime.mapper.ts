import { Injectable } from '@angular/core';

import { Anime, TAnime } from '../models/anime';
import { TAnimeDto } from '../dtos/anime.dto';
import { TMapper } from '../types/mapper';

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
				startDate: data.aired.start ? new Date(data.aired.start) : null,
				endDate: data.aired.end ? new Date(data.aired.end) : null,
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
				start: data.aired.startDate ? data.aired.startDate.toISOString() : null,
				end: data.aired.endDate ? data.aired.endDate.toISOString() : null,
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
