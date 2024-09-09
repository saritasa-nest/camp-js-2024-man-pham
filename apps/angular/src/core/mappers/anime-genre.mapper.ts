import { inject, Injectable } from '@angular/core';

import { AnimeGenreDto } from '@js-camp/core/dtos/anime-genre.dto';
import { AnimeGenre } from '@js-camp/core/models/anime-genre';
import { TMapper } from '@js-camp/core/models/mapper';

import { DateTimeMapper } from './date-time.mapper';

/** Anime genre mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeGenreMapper implements TMapper<AnimeGenreDto, AnimeGenre> {
	private readonly dateTimeMapper = inject(DateTimeMapper);

	/** @inheritdoc */
	public fromDto(dto: AnimeGenreDto): AnimeGenre {
		return new AnimeGenre({
			id: dto.id,
			createdDate: this.dateTimeMapper.fromDto(dto.created),
			modifiedDate: this.dateTimeMapper.fromDto(dto.modified),
			name: dto.name,
			type: dto.type,
		});
	}

	/** @inheritdoc */
	public toDto(model: AnimeGenre): AnimeGenreDto {
		return {
			id: model.id,
			created: this.dateTimeMapper.toDto(model.createdDate),
			modified: this.dateTimeMapper.toDto(model.modifiedDate),
			name: model.name,
			type: model.type,
		};
	}
}
