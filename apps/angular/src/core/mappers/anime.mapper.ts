import { inject, Injectable } from '@angular/core';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { Anime } from '@js-camp/core/models/anime';

import { TMapper } from '@js-camp/core/models/mapper';

import { DateTimeMapper } from './date-time.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';
import { AnimeStatusMapper } from './anime-status.mapper';

/** Anime mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper implements TMapper<AnimeDto, Anime> {
	private readonly dateTimeMapper = inject(DateTimeMapper);

	private readonly typeMapper = inject(AnimeTypeMapper);

	private readonly statusMapper = inject(AnimeStatusMapper);

	/** @inheritdoc */
	public fromDto(data: AnimeDto): Anime {
		return new Anime({
			id: data.id,
			createdDate: this.dateTimeMapper.fromDto(data.created),
			modifiedDate: this.dateTimeMapper.fromDto(data.modified),
			titleEng: data.title_eng,
			titleJpn: data.title_jpn,
			image: data.image,
			aired: {
				startDate: data.aired.start ? this.dateTimeMapper.fromDto(data.aired.start) : null,
				endDate: data.aired.end ? this.dateTimeMapper.fromDto(data.aired.end) : null,
			},
			type: this.typeMapper.MAP_ANIME_TYPE_FROM_DTO[data.type],
			status: this.statusMapper.MAP_ANIME_STATUS_FROM_DTO[data.status],
			score: data.score,
			userScore: data.user_score,
			studios: data.studios,
			genres: data.genres,
		});
	}

	/** @inheritdoc */
	public toDto(data: Anime): AnimeDto {
		return {
			id: data.id,
			created: this.dateTimeMapper.toDto(data.createdDate),
			modified: this.dateTimeMapper.toDto(data.modifiedDate),
			title_eng: data.titleEng,
			title_jpn: data.titleJpn,
			image: data.image,
			aired: {
				start: data.aired.startDate ? this.dateTimeMapper.toDto(data.aired.startDate) : null,
				end: data.aired.endDate ? this.dateTimeMapper.toDto(data.aired.endDate) : null,
			},
			type: this.typeMapper.MAP_ANIME_TYPE_TO_DTO[data.type],
			status: this.statusMapper.MAP_ANIME_STATUS_TO_DTO[data.status],
			score: data.score,
			user_score: data.userScore,
			studios: data.studios,
			genres: data.genres,
		};
	}
}
