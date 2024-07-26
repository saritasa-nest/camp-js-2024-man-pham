import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnimeQueryParams } from '@js-camp/core/models/query-params';
import { AnimeType } from '@js-camp/core/models/anime-type';

type QueryParams = {
	search?: string;
	pageNumber?: string;
	pageSize?: string;
	sortFields?: string[];
	type?: AnimeType;
};

@Injectable({
	providedIn: 'root',
})
export class UrlParamsService {
	private route = inject(ActivatedRoute);

	private router = inject(Router);

	private constructor() {}

	// Convert query parameters to AnimeQueryParams.Combined type
	public getCombinedQueryParams(): Observable<AnimeQueryParams.Combined> {
		return this.route.queryParamMap.pipe(
			map(params => {
				const combinedParams: Partial<AnimeQueryParams.Combined> = {};

				if (params.has('search')) {
					combinedParams.search = params.get('search');
				}
				if (params.has('pageNumber')) {
					combinedParams.pageNumber = Number(params.get('pageNumber'));
				}
				if (params.has('pageSize')) {
					combinedParams.pageSize = Number(params.get('pageSize'));
				}
				if (params.has('sortFields')) {
					combinedParams.sortFields = params.getAll('sortFields');
				}
				if (params.has('type')) {
					combinedParams.type = params.get('type') as AnimeType;
				}

				return combinedParams as AnimeQueryParams.Combined;
			}),
		);
	}

	// Set query parameters from AnimeQueryParams.Combined type
	public setCombinedQueryParams(params: AnimeQueryParams.Combined): void {
		const queryParams: QueryParams = {};

		if (params.search != null) {
			queryParams.search = params.search;
		}
		if (params.pageNumber != null) {
			queryParams.pageNumber = params.pageNumber.toString();
		}
		if (params.pageSize != null) {
			queryParams.pageSize = params.pageSize.toString();
		}
		if (params.sortFields != null) {
			queryParams.sortFields = params.sortFields;
		}
		if (params.type != null) {
			queryParams.type = params.type;
		}

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams,
			queryParamsHandling: 'merge',
		});
	}
}
