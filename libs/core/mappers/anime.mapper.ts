import { Injectable } from '@angular/core';

import { TAnime } from '../models/anime';
import { TAnimeDto } from '../dtos/anime.dto';
import { TMapper } from '../types/mapper';
import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeTypeDto } from '../dtos/anime-type.dto';

import { AnimeStatus } from '../models/anime-status';

import { AnimeType } from './../models/anime-type';

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
export class AnimeMapper implements TMapper<TAnimeDto, TAnime> {

	/** @inheritdoc */
	public fromDto(data: TAnimeDto): TAnime {
		return {
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
			type: MAP_ANIME_TYPE_FROM_DTO[data.type],
			status: MAP_ANIME_STATUS_FROM_DTO[data.status],
			score: data.score,
			userScore: data.user_score,
			studios: data.studios,
			genres: data.genres,
		};
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
			type: MAP_ANIME_TYPE_TO_DTO[data.type],
			status: MAP_ANIME_STATUS_TO_DTO[data.status],
			score: data.score,
			user_score: data.userScore,
			studios: data.studios,
			genres: data.genres,
		};
	}
}
