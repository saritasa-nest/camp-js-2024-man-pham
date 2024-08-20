import { Injectable } from '@angular/core';

import { AnimeStatus } from '../models/anime-status';
import { AnimeStatusDto } from '../dtos/anime-status.dto';

/** Anime status mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeStatusMapper {
	/** Map DTO to model. */
	public MAP_ANIME_STATUS_FROM_DTO: Record<AnimeStatusDto, AnimeStatus> = {
		[AnimeStatusDto.Airing]: AnimeStatus.Airing,
		[AnimeStatusDto.Finished]: AnimeStatus.Finished,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
	};

	/** Map model to DTO. */
	public MAP_ANIME_STATUS_TO_DTO: Record<AnimeStatus, AnimeStatusDto> = {
		[AnimeStatus.Airing]: AnimeStatusDto.Airing,
		[AnimeStatus.Finished]: AnimeStatusDto.Finished,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
	};
}
