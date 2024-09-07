import { inject, Injectable } from '@angular/core';

import { AnimeDetailDto } from '@js-camp/core/dtos/anime-detail.dto';
import { AnimeDetail } from '@js-camp/core/models/anime-detail';
import { TMapper } from '@js-camp/core/models/mapper';

import { AnimeMapper } from './anime.mapper';
import { AnimeStudioMapper } from './anime-studio.mapper';
import { AnimeGenreMapper } from './anime-genre.mapper';
import { AnimeRatingMapper } from './anime-rating.mapper';
import { AnimeSeasonMapper } from './anime-season.mapper';
import { AnimeSourceMapper } from './anime-source.mapper';

/** Anime detail mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeDetailMapper implements TMapper<AnimeDetailDto, AnimeDetail> {
	private readonly animeMapper = inject(AnimeMapper);

	private readonly ratingMapper = inject(AnimeRatingMapper);

	private readonly seasonMapper = inject(AnimeSeasonMapper);

	private readonly sourceMapper = inject(AnimeSourceMapper);

	private readonly genreMapper = inject(AnimeGenreMapper);

	private readonly studioMapper = inject(AnimeStudioMapper);

	/** @inheritdoc */
	public fromDto(dto: AnimeDetailDto): AnimeDetail {
		return new AnimeDetail({
			...this.animeMapper.fromDto(dto),
			rating: this.ratingMapper.fromDto(dto.rating),
			season: this.seasonMapper.fromDto(dto.season),
			source: this.sourceMapper.fromDto(dto.source),
			genreList: this.mapGenreListFromDto(dto.genres_data),
			studioList: this.mapStudioListFromDto(dto.studios_data),
			trailerUrl: dto.trailer_youtube_id,
			synopsis: dto.synopsis,
			airingStatus: dto.airing,
			background: dto.background,
			broadcastDay: dto.broadcast_day,
			broadcastTime: dto.broadcast_time,
			broadcastTimezone: dto.broadcast_timezone,
		});
	}

	/** @inheritdoc */
	public toDto(model: AnimeDetail): AnimeDetailDto {
		return {
			...this.animeMapper.toDto(model),
			rating: this.ratingMapper.toDto(model.rating),
			season: this.seasonMapper.toDto(model.season),
			source: this.sourceMapper.toDto(model.source),
			genres_data: this.mapGenreListToDto(model.genreList),
			studios_data: this.mapStudioListToDto(model.studioList),
			trailer_youtube_id: model.trailerUrl,
			synopsis: model.synopsis,
			airing: model.airingStatus,
			background: model.background,
			broadcast_day: model.broadcastDay,
			broadcast_time: model.broadcastTime,
			broadcast_timezone: model.broadcastTimezone,
		};
	}

	private mapGenreListFromDto(dto: AnimeDetailDto['genres_data']): AnimeDetail['genreList'] {
		return dto.map(genreDto => this.genreMapper.fromDto(genreDto));
	}

	private mapGenreListToDto(model: AnimeDetail['genreList']): AnimeDetailDto['genres_data'] {
		return model.map(genre => this.genreMapper.toDto(genre));
	}

	private mapStudioListFromDto(dto: AnimeDetailDto['studios_data']): AnimeDetail['studioList'] {
		return dto.map(studioDto => this.studioMapper.fromDto(studioDto));
	}

	private mapStudioListToDto(model: AnimeDetail['studioList']): AnimeDetailDto['studios_data'] {
		return model.map(studio => this.studioMapper.toDto(studio));
	}
}
