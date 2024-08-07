import { BaseFilterParamsDto } from './base-filter-params.dto';

/** Anime filter params DTO. */
export namespace AnimeFilterParamsDto {

	/** Sort. */
	export type Sort = {

		/** Order. */
		readonly ordering?: string;
	};

	/** Anime Type. */
	export type Type = {

		/** Order. */
		readonly type?: string;
	};

	/** Anime query params dto. */
	export type Combined = BaseFilterParamsDto.Combined & Sort & Type;
}
