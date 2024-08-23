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

/** Anime mapper. */
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

	/** @inheritdoc */
	public fromDto(dto: AnimeDetailDto): AnimeDetail {
		return new AnimeDetail({
			...this.animeMapper.fromDto(dto),
			rating: this.ratingMapper.MAP_ANIME_RATING_FROM_DTO[dto.rating],
			season: this.seasonMapper.MAP_ANIME_SEASON_FROM_DTO[dto.season],
			source: this.sourceMapper.MAP_ANIME_SOURCE_FROM_DTO[dto.source],
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
			rating: this.ratingMapper.MAP_ANIME_RATING_TO_DTO[model.rating],
			season: this.seasonMapper.MAP_ANIME_SEASON_TO_DTO[model.season],
			source: this.sourceMapper.MAP_ANIME_SOURCE_TO_DTO[model.source],
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
}
