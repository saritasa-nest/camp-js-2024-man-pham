import { Injectable } from '@angular/core';

import { TMapperToDto } from '../models/mapper';
import { BaseFilterParams } from '../models/base-filter-params';
import { BaseFilterParamsDto } from '../dtos/base-filter-params.dto';

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
