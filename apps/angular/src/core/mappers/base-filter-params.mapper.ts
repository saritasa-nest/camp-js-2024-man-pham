import { Injectable } from '@angular/core';
import { BaseFilterParamsDto } from '@js-camp/core/dtos/base-filter-params.dto';
import { BaseFilterParams } from '@js-camp/core/models/base-filter-params';
import { TMapperToDto } from '@js-camp/core/models/mapper';

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class BaseFilterParamsMapper implements TMapperToDto<BaseFilterParamsDto.Combined, BaseFilterParams.Combined> {
	private mapPaginationOptionsToDto(model: BaseFilterParams.Pagination): BaseFilterParamsDto.Pagination | null {
		if (model.pageNumber !== null && model.pageSize !== null) {
			return {
				offset: model.pageNumber * model.pageSize,
				limit: model.pageSize,
			};
		}
		return null;
	}

	private mapSearchOptionsToDto(model: BaseFilterParams.Search): BaseFilterParamsDto.Search | null {
		if (model.search) {
			return {
				search: model.search,
			};
		}
		return null;
	}

	/** @inheritdoc */
	public toDto(model: BaseFilterParams.Combined): BaseFilterParamsDto.Combined {
		return {
			...this.mapPaginationOptionsToDto(model),
			...this.mapSearchOptionsToDto(model),
		};
	}
}
