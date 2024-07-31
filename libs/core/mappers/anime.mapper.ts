import { inject, Injectable } from '@angular/core';

import { Anime } from '../models/anime';
import { AnimeDto } from '../dtos/anime.dto';
import { TMapper } from '../models/mapper';
import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeTypeDto } from '../dtos/anime-type.dto';

import { AnimeStatus } from '../models/anime-status';

import { AnimeType } from './../models/anime-type';
import { DateTimeMapper } from './date-time.mapper';

const MAP_ANIME_TYPE_FROM_DTO: Record<AnimeTypeDto, AnimeType> = {
	[AnimeTypeDto.Tv]: AnimeType.Tv,
	[AnimeTypeDto.Ova]: AnimeType.Ona,
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.Ona]: AnimeType.Ona,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.Unknown]: AnimeType.Unknown,
	[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
};

const MAP_ANIME_TYPE_TO_DTO: Record<AnimeType, AnimeTypeDto> = {
	[AnimeType.Tv]: AnimeTypeDto.Tv,
	[AnimeType.Ova]: AnimeTypeDto.Ona,
	[AnimeType.Movie]: AnimeTypeDto.Movie,
	[AnimeType.Special]: AnimeTypeDto.Special,
	[AnimeType.Ona]: AnimeTypeDto.Ona,
	[AnimeType.Music]: AnimeTypeDto.Music,
	[AnimeType.Unknown]: AnimeTypeDto.Unknown,
	[AnimeType.PromotionalVideos]: AnimeTypeDto.PromotionalVideos,
};

const MAP_ANIME_STATUS_FROM_DTO: Record<AnimeStatusDto, AnimeStatus> = {
	[AnimeStatusDto.Airing]: AnimeStatus.Airing,
	[AnimeStatusDto.Finished]: AnimeStatus.Finished,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};

const MAP_ANIME_STATUS_TO_DTO: Record<AnimeStatus, AnimeStatusDto> = {
	[AnimeStatus.Airing]: AnimeStatusDto.Airing,
	[AnimeStatus.Finished]: AnimeStatusDto.Finished,
	[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
};

/** Anime mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper implements TMapper<AnimeDto, Anime> {
	private readonly dateTimeMapper = inject(DateTimeMapper);

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
			type: MAP_ANIME_TYPE_FROM_DTO[data.type],
			status: MAP_ANIME_STATUS_FROM_DTO[data.status],
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
			type: MAP_ANIME_TYPE_TO_DTO[data.type],
			status: MAP_ANIME_STATUS_TO_DTO[data.status],
			score: data.score,
			user_score: data.userScore,
			studios: data.studios,
			genres: data.genres,
		};
	}
}
