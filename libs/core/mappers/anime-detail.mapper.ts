import { inject, Injectable } from '@angular/core';

import { TMapper } from '../models/mapper';

import { AnimeDetailDto } from '../dtos/anime-detail.dto';
import { AnimeDetails } from '../models/anime-detail';

import { AnimeSeasonDto } from '../dtos/anime-season.dto';

import { AnimeSeason } from '../models/anime-season';

import { AnimeSourceDto } from '../dtos/anime-source.dto';

import { AnimeSource } from '../models/anime-source';

import { AnimeRatingDto } from '../dtos/anime-rating.dto';

import { AnimeRating } from '../models/anime-rating';

import { AnimeGenreMapper } from './anime-genre.mapper';
import { AnimeStudioMapper } from './anime-studio.mapper';
import { AnimeMapper } from './anime.mapper';

const MAP_ANIME_SEASON_FROM_DTO: Record<AnimeSeasonDto, AnimeSeason> = {
	[AnimeSeasonDto.Spring]: AnimeSeason.Spring,
	[AnimeSeasonDto.Summer]: AnimeSeason.Summer,
	[AnimeSeasonDto.Fall]: AnimeSeason.Fall,
	[AnimeSeasonDto.Winter]: AnimeSeason.Winter,
	[AnimeSeasonDto.NonSeasonal]: AnimeSeason.NonSeasonal,
};

const MAP_ANIME_SEASON_TO_DTO: Record<AnimeSeason, AnimeSeasonDto> = {
	[AnimeSeason.Spring]: AnimeSeasonDto.Spring,
	[AnimeSeason.Summer]: AnimeSeasonDto.Summer,
	[AnimeSeason.Fall]: AnimeSeasonDto.Fall,
	[AnimeSeason.Winter]: AnimeSeasonDto.Winter,
	[AnimeSeason.NonSeasonal]: AnimeSeasonDto.NonSeasonal,
};

const MAP_ANIME_SOURCE_FROM_DTO: Record<AnimeSourceDto, AnimeSource> = {
	[AnimeSourceDto.Book]: AnimeSource.Book,
	[AnimeSourceDto.CardGame]: AnimeSource.CardGame,
	[AnimeSourceDto.FourKomaManga]: AnimeSource.FourKomaManga,
	[AnimeSourceDto.Game]: AnimeSource.Game,
	[AnimeSourceDto.LightNovel]: AnimeSource.LightNovel,
	[AnimeSourceDto.Manga]: AnimeSource.Manga,
	[AnimeSourceDto.MixedMedia]: AnimeSource.MixedMedia,
	[AnimeSourceDto.Music]: AnimeSource.Music,
	[AnimeSourceDto.Novel]: AnimeSource.Novel,
	[AnimeSourceDto.Original]: AnimeSource.Original,
	[AnimeSourceDto.Other]: AnimeSource.Other,
	[AnimeSourceDto.PictureBook]: AnimeSource.PictureBook,
	[AnimeSourceDto.Radio]: AnimeSource.Radio,
	[AnimeSourceDto.Unknown]: AnimeSource.Unknown,
	[AnimeSourceDto.VisualNovel]: AnimeSource.VisualNovel,
	[AnimeSourceDto.WebManga]: AnimeSource.WebManga,
	[AnimeSourceDto.WebNovel]: AnimeSource.WebNovel,
};

const MAP_ANIME_SOURCE_TO_DTO: Record<AnimeSource, AnimeSourceDto> = {
	[AnimeSource.Book]: AnimeSourceDto.Book,
	[AnimeSource.CardGame]: AnimeSourceDto.CardGame,
	[AnimeSource.FourKomaManga]: AnimeSourceDto.FourKomaManga,
	[AnimeSource.Game]: AnimeSourceDto.Game,
	[AnimeSource.LightNovel]: AnimeSourceDto.LightNovel,
	[AnimeSource.Manga]: AnimeSourceDto.Manga,
	[AnimeSource.MixedMedia]: AnimeSourceDto.MixedMedia,
	[AnimeSource.Music]: AnimeSourceDto.Music,
	[AnimeSource.Novel]: AnimeSourceDto.Novel,
	[AnimeSource.Original]: AnimeSourceDto.Original,
	[AnimeSource.Other]: AnimeSourceDto.Other,
	[AnimeSource.PictureBook]: AnimeSourceDto.PictureBook,
	[AnimeSource.Radio]: AnimeSourceDto.Radio,
	[AnimeSource.Unknown]: AnimeSourceDto.Unknown,
	[AnimeSource.VisualNovel]: AnimeSourceDto.VisualNovel,
	[AnimeSource.WebManga]: AnimeSourceDto.WebManga,
	[AnimeSource.WebNovel]: AnimeSourceDto.WebNovel,
};

const MAP_ANIME_RATING_FROM_DTO: Record<AnimeRatingDto, AnimeRating> = {
	[AnimeRatingDto.G]: AnimeRating.G,
	[AnimeRatingDto.Pg]: AnimeRating.Pg,
	[AnimeRatingDto.Pg13]: AnimeRating.Pg13,
	[AnimeRatingDto.R17]: AnimeRating.R17,
	[AnimeRatingDto.RPlus]: AnimeRating.RPlus,
	[AnimeRatingDto.Rx]: AnimeRating.Rx,
	[AnimeRatingDto.Unknown]: AnimeRating.Unknown,
};

const MAP_ANIME_RATING_TO_DTO: Record<AnimeRating, AnimeRatingDto> = {
	[AnimeRating.G]: AnimeRatingDto.G,
	[AnimeRating.Pg]: AnimeRatingDto.Pg,
	[AnimeRating.Pg13]: AnimeRatingDto.Pg13,
	[AnimeRating.R17]: AnimeRatingDto.R17,
	[AnimeRating.RPlus]: AnimeRatingDto.RPlus,
	[AnimeRating.Rx]: AnimeRatingDto.Rx,
	[AnimeRating.Unknown]: AnimeRatingDto.Unknown,
};

/** Anime mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeDetailMapper implements TMapper<AnimeDetailDto, AnimeDetails> {

	private readonly animeMapper = inject(AnimeMapper);

	private readonly genreMapper = inject(AnimeGenreMapper);

	private readonly studioMapper = inject(AnimeStudioMapper);

	private mapGenreListFromDto(dto: AnimeDetailDto['genres_data']): AnimeDetails['genreList'] {
		return dto.map(genreDto => this.genreMapper.fromDto(genreDto));
	}

	private mapGenreListToDto(model: AnimeDetails['genreList']): AnimeDetailDto['genres_data'] {
		return model.map(genre => this.genreMapper.toDto(genre));
	}

	private mapStudioListFromDto(dto: AnimeDetailDto['studios_data']): AnimeDetails['studioList'] {
		return dto.map(studioDto => this.studioMapper.fromDto(studioDto));
	}

	private mapStudioListToDto(model: AnimeDetails['studioList']): AnimeDetailDto['studios_data'] {
		return model.map(studio => this.studioMapper.toDto(studio));
	}

	/** @inheritdoc */
	public fromDto(dto: AnimeDetailDto): AnimeDetails {
		return new AnimeDetails({
			...this.animeMapper.fromDto(dto),
			rating: MAP_ANIME_RATING_FROM_DTO[dto.rating],
			season: MAP_ANIME_SEASON_FROM_DTO[dto.season],
			source: MAP_ANIME_SOURCE_FROM_DTO[dto.source],
			genreList: this.mapGenreListFromDto(dto.genres_data),
			studioList: this.mapStudioListFromDto(dto.studios_data),
			trailerUrl: dto.trailer_youtube_id,
			synopsis: dto.synopsis,
			airingStatus: dto.airing ? 'on air' : 'off air',
			background: dto.background,
			broadcastDay: dto.broadcast_day,
			broadcastTime: dto.broadcast_time,
			broadcastTimezone: dto.broadcast_timezone,
		});
	}

	/** @inheritdoc */
	public toDto(model: AnimeDetails): AnimeDetailDto {
		return {
			...this.animeMapper.toDto(model),
			rating: MAP_ANIME_RATING_TO_DTO[model.rating],
			season: MAP_ANIME_SEASON_TO_DTO[model.season],
			source: MAP_ANIME_SOURCE_TO_DTO[model.source],
			genres_data: this.mapGenreListToDto(model.genreList),
			studios_data: this.mapStudioListToDto(model.studioList),
			trailer_youtube_id: model.trailerUrl,
			synopsis: model.synopsis,
			airing: model.airingStatus === 'on air' ?? false,
			background: model.background,
			broadcast_day: model.broadcastDay,
			broadcast_time: model.broadcastTime,
			broadcast_timezone: model.broadcastTimezone,
		};
	}
}
