import { Injectable } from '@angular/core';
import { AnimeSeasonDto } from '@js-camp/core/dtos/anime-season.dto';
import { AnimeSeason } from '@js-camp/core/models/anime-season';

/** Anime season mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeSeasonMapper {
	/** Map DTO to model. */
	public readonly MAP_ANIME_SEASON_FROM_DTO: Record<AnimeSeasonDto, AnimeSeason> = {
		[AnimeSeasonDto.Spring]: AnimeSeason.Spring,
		[AnimeSeasonDto.Summer]: AnimeSeason.Summer,
		[AnimeSeasonDto.Fall]: AnimeSeason.Fall,
		[AnimeSeasonDto.Winter]: AnimeSeason.Winter,
		[AnimeSeasonDto.NonSeasonal]: AnimeSeason.NonSeasonal,
	};

	/** Map model to DTO. */
	public readonly MAP_ANIME_SEASON_TO_DTO: Record<AnimeSeason, AnimeSeasonDto> = {
		[AnimeSeason.Spring]: AnimeSeasonDto.Spring,
		[AnimeSeason.Summer]: AnimeSeasonDto.Summer,
		[AnimeSeason.Fall]: AnimeSeasonDto.Fall,
		[AnimeSeason.Winter]: AnimeSeasonDto.Winter,
		[AnimeSeason.NonSeasonal]: AnimeSeasonDto.NonSeasonal,
	};
}
