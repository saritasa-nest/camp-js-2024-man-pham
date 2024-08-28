import { inject, Injectable } from '@angular/core';

import { AnimeFilterParamsDto } from '@js-camp/core/dtos/anime-filter-params.dto';
import { AnimeSortFieldsDto } from '@js-camp/core/dtos/anime-sort-fields.dto';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeSortFields } from '@js-camp/core/models/anime-sort-fields';
import { TMapperToDto } from '@js-camp/core/models/mapper';
import { SortDirection } from '@js-camp/core/models/sort-direction';

import { AnimeTypeMapper } from './anime-type.mapper';
import { BaseFilterParamsMapper } from './base-filter-params.mapper';

const MAP_ANIME_SORT_FIELDS_TO_DTO: Record<AnimeSortFields, AnimeSortFieldsDto> = {
	[AnimeSortFields.StartDate]: AnimeSortFieldsDto.StartDate,
	[AnimeSortFields.Status]: AnimeSortFieldsDto.Status,
	[AnimeSortFields.TitleEng]: AnimeSortFieldsDto.TitleEng,
};

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class AnimeFilterParamsMapper
implements TMapperToDto<AnimeFilterParamsDto.Combined, AnimeFilterParams.Combined> {
	private readonly baseFilterMapper = inject(BaseFilterParamsMapper);

	private readonly typeMapper = inject(AnimeTypeMapper);

	/** @inheritdoc */
	public toDto(model: AnimeFilterParams.Combined): AnimeFilterParamsDto.Combined {
		return {
			...this.baseFilterMapper.toDto(model),
			...this.mapOrderingOptionToDto(model),
			...this.mapTypeOptionToDto(model),
		};
	}

	private mapOrderingOptionToDto(model: AnimeFilterParams.Sort): AnimeFilterParamsDto.Sort | null {
		if (model.sortDirection && model.sortField) {
			const fieldDto = MAP_ANIME_SORT_FIELDS_TO_DTO[model.sortField];
			return {
				ordering: model.sortDirection === SortDirection.Descending ? `-${fieldDto}` : fieldDto,
			};
		}

		return null;
	}

	private mapTypeOptionToDto(model: AnimeFilterParams.Type): AnimeFilterParamsDto.Type | null {
		if (model.type) {
			return {
				type: this.typeMapper.MAP_ANIME_TYPE_TO_DTO[model.type],
			};
		}
		return null;
	}
}
