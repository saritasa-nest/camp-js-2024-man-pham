import { inject, Injectable } from '@angular/core';

import { AppConfig } from './app-config';

/**
 * Urls used within the application.
 * Stringified for convenience, since most of the Angular's HTTP tools work with strings.
 */
@Injectable({ providedIn: 'root' })
export class AppUrlsConfig {
	private readonly appConfig = inject(AppConfig);

	/** Anime-related routes. */
	public readonly anime = {
		list: this.toApi('anime/'),
	};

	/**
	 * Generate Api urls as an constant.
	 * @param args Multiple relative path.
	 */
	private toApi(...args: string[]): string {
		const relativePath = args.join('/');
		const baseUrl = this.appConfig.apiUrl;
		return new URL(relativePath, baseUrl).toString();
	}
}
