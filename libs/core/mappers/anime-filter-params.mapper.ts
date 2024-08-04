import { Injectable } from '@angular/core';

import { AnimeType } from '../models/anime-type';
import { AnimeTypeDto } from '../dtos/anime-type.dto';
import { TMapperToDto } from '../models/mapper';
import { AnimeFilterParams } from '../models/anime-filter-params';
import { AnimeFilterParamsDto } from '../dtos/anime-filter-params.dto';
import { AnimeSortFields } from '../models/anime-sort-fields';
import { AnimeSortFieldsDto } from '../dtos/anime-sort-fields.dto';
import { SortDirection } from '../models/sort-direction';

const MAP_ANIME_TYPE_TO_DTO: Record<AnimeType, AnimeTypeDto> = {
	[AnimeType.Tv]: AnimeTypeDto.Tv,
	[AnimeType.Ova]: AnimeTypeDto.Ova,
	[AnimeType.Movie]: AnimeTypeDto.Movie,
	[AnimeType.Special]: AnimeTypeDto.Special,
	[AnimeType.Ona]: AnimeTypeDto.Ona,
	[AnimeType.Music]: AnimeTypeDto.Music,
	[AnimeType.Unknown]: AnimeTypeDto.Unknown,
	[AnimeType.PromotionalVideos]: AnimeTypeDto.PromotionalVideos,
};

const MAP_ANIME_SORT_FIELDS_TO_DTO: Record<AnimeSortFields, AnimeSortFieldsDto> = {
	[AnimeSortFields.StartDate]: AnimeSortFieldsDto.StartDate,
	[AnimeSortFields.Status]: AnimeSortFieldsDto.Status,
	[AnimeSortFields.TitleEng]: AnimeSortFieldsDto.TitleEng,

};

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class AnimeFilterParamsMapper implements TMapperToDto<AnimeFilterParamsDto.Combined, AnimeFilterParams.Combined> {
	private mapPaginationOptionsToDto(model: AnimeFilterParams.Pagination): AnimeFilterParamsDto.Pagination | null {
		if (model.pageNumber !== null && model.pageSize !== null) {
			return {
				offset: model.pageNumber * model.pageSize,
				limit: model.pageSize,
			};
		}
		return null ;
	}

	private mapSearchOptionsToDto(model: AnimeFilterParams.Search): AnimeFilterParamsDto.Search | null {
		if (model.search) {
			return {
				search: model.search,
			};
		}
		return null;
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
				type: MAP_ANIME_TYPE_TO_DTO[model.type],
			};
		}
		return null;
	}

	/** @inheritdoc */
	public toDto(model: AnimeFilterParams.Combined): AnimeFilterParamsDto.Combined {
		return {
			...this.mapPaginationOptionsToDto(model),
			...this.mapSearchOptionsToDto(model),
			...this.mapOrderingOptionToDto(model),
			...this.mapTypeOptionToDto(model),
		};
	}
}