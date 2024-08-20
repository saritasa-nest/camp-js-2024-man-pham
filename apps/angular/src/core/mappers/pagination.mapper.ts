import { Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { TMapperFromDto, TMapperFunction } from '@js-camp/core/models/mapper';
import { Pagination } from '@js-camp/core/models/pagination';

/** Pagination mapper. */
@Injectable({
	providedIn: 'root',
})
export class PaginationMapper {
	/**
	 * Map pagination from dto.
	 * @param paginationDto Pagination Dto.
	 * @param mapper Mapper for the items.
	 */
	public mapPaginationFromDto<TDto, TDomain>(
		paginationDto: PaginationDto<TDto>,
		mapper: TMapperFromDto<TDto, TDomain> | TMapperFunction<TDto, TDomain>,
	): Pagination<TDomain> {
		const mapperFn = typeof mapper === 'function' ? mapper : mapper.fromDto;
		return new Pagination<TDomain>({
			totalCount: paginationDto.count,
			hasNext: Boolean(paginationDto.next),
			hasPrevious: Boolean(paginationDto.previous),
			items: paginationDto.results.map(item => mapperFn(item)),
		});
	}
}
