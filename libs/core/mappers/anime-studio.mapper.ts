import { inject, Injectable } from '@angular/core';

import { TMapper } from '../models/mapper';

import { AnimeStudioDto } from '../dtos/anime-studio.dto';
import { AnimeStudio } from '../models/anime-studio';

import { DateTimeMapper } from './date-time.mapper';

/** Anime studio mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeStudioMapper implements TMapper<AnimeStudioDto, AnimeStudio> {
	private readonly dateTimeMapper = inject(DateTimeMapper);

	/** @inheritdoc */
	public fromDto(dto: AnimeStudioDto): AnimeStudio {
		return new AnimeStudio({
			id: dto.id,
			createdDate: this.dateTimeMapper.fromDto(dto.created),
			modifiedDate: this.dateTimeMapper.fromDto(dto.modified),
			name: dto.name,
			image: dto.image,
		});
	}

	/** @inheritdoc */
	public toDto(model: AnimeStudio): AnimeStudioDto {
		return {
			id: model.id,
			created: this.dateTimeMapper.toDto(model.createdDate),
			modified: this.dateTimeMapper.toDto(model.modifiedDate),
			name: model.name,
			image: model.image,
		};
	}
}
