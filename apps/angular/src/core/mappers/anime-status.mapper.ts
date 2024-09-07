import { Injectable } from '@angular/core';
import { AnimeStatusDto } from '@js-camp/core/dtos/anime-status.dto';
import { AnimeStatus } from '@js-camp/core/models/anime-status';
import { TMapper } from '@js-camp/core/models/mapper';

/** Anime status mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeStatusMapper implements TMapper<AnimeStatusDto, AnimeStatus> {
	private readonly MAP_ANIME_STATUS_FROM_DTO: Record<AnimeStatusDto, AnimeStatus> = {
		[AnimeStatusDto.Airing]: AnimeStatus.Airing,
		[AnimeStatusDto.Finished]: AnimeStatus.Finished,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
	};

	/** Map model to DTO. */
	private readonly MAP_ANIME_STATUS_TO_DTO: Record<AnimeStatus, AnimeStatusDto> = {
		[AnimeStatus.Airing]: AnimeStatusDto.Airing,
		[AnimeStatus.Finished]: AnimeStatusDto.Finished,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
	};

	/** @inheritdoc */
	public fromDto(dto: AnimeStatusDto): AnimeStatus {
		return this.MAP_ANIME_STATUS_FROM_DTO[dto];
	}

	/** @inheritdoc */
	public toDto(model: AnimeStatus): AnimeStatusDto {
		return this.MAP_ANIME_STATUS_TO_DTO[model];
	}
}
