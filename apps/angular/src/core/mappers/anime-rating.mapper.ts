import { Injectable } from '@angular/core';
import { AnimeRatingDto } from '@js-camp/core/dtos/anime-rating.dto';
import { AnimeRating } from '@js-camp/core/models/anime-rating';

/** Anime rating mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeRatingMapper {
	/** Map DTO to model. */
	public readonly MAP_ANIME_RATING_FROM_DTO: Record<AnimeRatingDto, AnimeRating> = {
		[AnimeRatingDto.G]: AnimeRating.G,
		[AnimeRatingDto.Pg]: AnimeRating.Pg,
		[AnimeRatingDto.Pg13]: AnimeRating.Pg13,
		[AnimeRatingDto.R17]: AnimeRating.R17,
		[AnimeRatingDto.RPlus]: AnimeRating.RPlus,
		[AnimeRatingDto.Rx]: AnimeRating.Rx,
		[AnimeRatingDto.Unknown]: AnimeRating.Unknown,
	};

	/** Map model to DTO. */
	public readonly MAP_ANIME_RATING_TO_DTO: Record<AnimeRating, AnimeRatingDto> = {
		[AnimeRating.G]: AnimeRatingDto.G,
		[AnimeRating.Pg]: AnimeRatingDto.Pg,
		[AnimeRating.Pg13]: AnimeRatingDto.Pg13,
		[AnimeRating.R17]: AnimeRatingDto.R17,
		[AnimeRating.RPlus]: AnimeRatingDto.RPlus,
		[AnimeRating.Rx]: AnimeRatingDto.Rx,
		[AnimeRating.Unknown]: AnimeRatingDto.Unknown,
	};
}
