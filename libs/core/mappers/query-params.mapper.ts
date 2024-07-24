import { Injectable } from '@angular/core';

import { AnimeQueryParams } from '../models/query-params';
import { AnimeQueryParamsDto } from '../dtos/query-params.dto';

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class BaseFilterParamsMapper {

	/** @inheritdoc */
	public mapPaginationOptionsToDto(model: AnimeQueryParams.Pagination): AnimeQueryParamsDto.Pagination {
		return {
			offset: model.pageNumber * model.pageSize,
			limit: model.pageSize,
		};
	}

	/** @inheritdoc */
	public mapSearchOptionsToDto(model: AnimeQueryParams.Search): AnimeQueryParamsDto.Search {
		return {
			search: model.search,
		};
	}

	/** @inheritdoc */
	public mapOrderingOptionToDto(model: AnimeQueryParams.Sort): AnimeQueryParamsDto.Sort {
		return {
			ordering: model.sortFields.join(','),
		};
	}

	/** @inheritdoc */
	public mapTypeOptionToDto(model: AnimeQueryParams.AnimeType): AnimeQueryParamsDto.AnimeType {
		return {
			type: model.animeType,
		};
	}

	/** @inheritdoc */
	public mapCombinedOptionsToDto(model: AnimeQueryParams.Combined): AnimeQueryParamsDto.Combined {
		return {
			...this.mapPaginationOptionsToDto(model),
			...this.mapSearchOptionsToDto(model),
			...this.mapOrderingOptionToDto(model),
			...this.mapTypeOptionToDto(model),
		};
	}

}
