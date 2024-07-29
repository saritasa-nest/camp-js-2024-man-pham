import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnimeQueryParams } from '@js-camp/core/models/query-params';
import { AnimeType } from '@js-camp/core/models/anime-type';

/** Service for handling URL query params. */
@Injectable({
	providedIn: 'root',
})
export class UrlParamsService {
	private route = inject(ActivatedRoute);

	private router = inject(Router);

	private constructor() {}

	/** Convert the params from URL. */
	public getCombinedQueryParams(): Observable<AnimeQueryParams.Combined> {
		return this.route.queryParamMap.pipe(
			map(params => {
				const combinedParams: Partial<AnimeQueryParams.Combined> = {};

				if (params.has('search')) {
					combinedParams.search = params.get('search');
				}
				combinedParams.pageNumber = params.has('pageNumber') ? Number(params.get('pageNumber')) : 1;
				combinedParams.pageSize = params.has('pageSize') ? Number(params.get('pageSize')) : 10;
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

	/** Get current URL parameters. */
	public getCurrentParams(): AnimeQueryParams.Combined {
		return this.route.snapshot.queryParams as AnimeQueryParams.Combined;
	}

	/**
	 * Set new query params and navigate.
	 * @param params The given query params.
	 */
	public setCombinedQueryParams(params: Partial<AnimeQueryParams.Combined>): void {
		const currentParams = { ...this.route.snapshot.queryParams };
		const newParams = { ...currentParams, ...params };

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: newParams,
			queryParamsHandling: 'merge',
		});
	}
}
