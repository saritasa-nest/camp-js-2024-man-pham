import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/** Query param service.*/
@Injectable({
	providedIn: 'root',
})
export class QueryParamsService {
	private readonly router = inject(Router);

	private readonly activatedRoute = inject(ActivatedRoute);

	/**
	 * Remove undefined fields.
	 * @param obj Object to remove.
	 */
	private removeUndefinedFields<T extends Record<string, unknown>>(obj: T): Partial<T> {
		return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined)) as Partial<T>;
	}

	/**
	 * Append provide query params to the URL.
	 * @param params Params to append.
	 * The `params` argument uses `any` for flexibility, allowing various types of values.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public append(params: Record<string, any>): void {
		const paramsWithoutUndefinedField = this.removeUndefinedFields(params);
		this.router.navigate([], {
			queryParams: paramsWithoutUndefinedField,
			relativeTo: this.activatedRoute,
			queryParamsHandling: 'merge',
		});
	}

	/**
	 * Append provide query params and reset page number params to the URL.
	 * @param params Params to append.
	 * @param defaultPageNumber The default page number to reset to.
	 * The `params` argument uses `any` for flexibility, allowing various types of values.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public appendParamsAndResetPageNumber(params: Record<string, any>, defaultPageNumber: number): void {
		return this.append({ ...params, pageNumber: defaultPageNumber });
	}
}
