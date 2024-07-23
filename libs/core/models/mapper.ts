/** Mapper of DTO to domain model. */
export type TMapperFromDto<TDto, TDomain> = {

	/** Maps from DTO to Domain model. */
	fromDto(dto: TDto): TDomain;
};

/** Mapper of domain model to DTO. */
export type TMapperToDto<TDto, TDomain> = {

	/** Maps from Domain to DTO model. */
	toDto(data: TDomain): TDto;
};

/** Custom Mapper function. */
export type TMapperFunction<TDto, TDomain> = (dto: TDto) => TDomain;

/** Mapper from DTO to Domain model and vice versa. */
export type TMapper<TDto, TDomain> = {} & TMapperFromDto<TDto, TDomain> & TMapperToDto<TDto, TDomain>;
