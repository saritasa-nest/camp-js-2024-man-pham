import { Injectable } from '@angular/core';

import { AnimeQueryParams } from '../models/query-params';
import { AnimeQueryParamsDto } from '../dtos/query-params.dto';
import { AnimeType } from '../models/anime-type';
import { AnimeTypeDto } from '../dtos/anime-type.dto';

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

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsMapper {

	/** @inheritdoc */
	public mapPaginationOptionsToDto(model: AnimeQueryParams.Pagination): AnimeQueryParamsDto.Pagination | null {
		if (model.pageNumber !== null && model.pageSize !== null) {
			return {
				offset: model.pageNumber * model.pageSize,
				limit: model.pageSize,
			};
		}
		return null ;
	}

	/** @inheritdoc */
	public mapSearchOptionsToDto(model: AnimeQueryParams.Search): AnimeQueryParamsDto.Search | null {
		if (model.search) {
			return {
				search: model.search,
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapOrderingOptionToDto(model: AnimeQueryParams.Sort): AnimeQueryParamsDto.Sort | null {
		if (model.sortFields) {
			return {
				ordering: model.sortFields.join(','),
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapTypeOptionToDto(model: AnimeQueryParams.Type): AnimeQueryParamsDto.Type | null {
		if (model.type) {
			return {
				type: MAP_ANIME_TYPE_TO_DTO[model.type],
			};
		}
		return null;
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
