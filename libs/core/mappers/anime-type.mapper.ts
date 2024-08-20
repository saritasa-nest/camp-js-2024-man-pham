import { Injectable } from '@angular/core';

import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { AnimeType } from '../models/anime-type';

/** Anime type mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeTypeMapper {
	/** Map DTO to model. */
	public MAP_ANIME_TYPE_FROM_DTO: Record<AnimeTypeDto, AnimeType> = {
		[AnimeTypeDto.Tv]: AnimeType.Tv,
		[AnimeTypeDto.Ova]: AnimeType.Ova,
		[AnimeTypeDto.Movie]: AnimeType.Movie,
		[AnimeTypeDto.Special]: AnimeType.Special,
		[AnimeTypeDto.Ona]: AnimeType.Ona,
		[AnimeTypeDto.Music]: AnimeType.Music,
		[AnimeTypeDto.Unknown]: AnimeType.Unknown,
		[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
	};

	/** Map model to DTO. */
	public MAP_ANIME_TYPE_TO_DTO: Record<AnimeType, AnimeTypeDto> = {
		[AnimeType.Tv]: AnimeTypeDto.Tv,
		[AnimeType.Ova]: AnimeTypeDto.Ova,
		[AnimeType.Movie]: AnimeTypeDto.Movie,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.Ona]: AnimeTypeDto.Ona,
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
		[AnimeType.PromotionalVideos]: AnimeTypeDto.PromotionalVideos,
	};
}
