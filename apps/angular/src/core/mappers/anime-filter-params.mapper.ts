import { inject, Injectable } from '@angular/core';

import { AnimeFilterParamsDto } from '@js-camp/core/dtos/anime-filter-params.dto';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { TMapperToDto } from '@js-camp/core/models/mapper';
import { SortDirection } from '@js-camp/core/models/sort-direction';

import { AnimeTypeMapper } from './anime-type.mapper';
import { BaseFilterParamsMapper } from './base-filter-params.mapper';
import { AnimeSortFieldsMapper } from './anime-sort-fields.mapper';

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class AnimeFilterParamsMapper
implements TMapperToDto<AnimeFilterParamsDto.Combined, AnimeFilterParams.Combined> {
	private readonly baseFilterMapper = inject(BaseFilterParamsMapper);

	private readonly typeMapper = inject(AnimeTypeMapper);

	private readonly sortFieldsMapper = inject(AnimeSortFieldsMapper);

	/** @inheritdoc */
	public toDto(model: AnimeFilterParams.Combined): AnimeFilterParamsDto.Combined {
		return {
			...this.baseFilterMapper.toDto(model),
			...this.mapOrderingOptionToDto(model),
			...this.mapTypeOptionToDto(model),
		};
	}

	private mapOrderingOptionToDto(model: AnimeFilterParams.Sort): AnimeFilterParamsDto.Sort | null {
		if (model.sortDirection != null && model.sortField != null) {
			const fieldDto = this.sortFieldsMapper.toDto(model.sortField);
			return {
				ordering: model.sortDirection === SortDirection.Descending ? `-${fieldDto}` : fieldDto,
			};
		}

		return null;
	}

	private mapTypeOptionToDto(model: AnimeFilterParams.Type): AnimeFilterParamsDto.Type | null {
		if (model.type != null) {
			return {
				type: this.typeMapper.toDto(model.type),
			};
		}
		return null;
	}
}
