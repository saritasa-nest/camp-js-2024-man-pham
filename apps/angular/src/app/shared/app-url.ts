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
		create: this.toApi('anime/'),
		detail: (id: string) => this.toApi(`anime/${id}/`),
		update: (id: string) => this.toApi(`anime/${id}/`),
		delete: (id: string) => this.toApi(`anime/${id}/`),
	};

	/** Authentication-related routes. */
	public readonly auth = {
		login: this.toApi('auth/login/'),
		register: this.toApi('auth/register/'),
		token: {
			refresh: this.toApi('auth/token/refresh/'),
			verify: this.toApi('auth/token/verify/'),
		},
	};

	/** User-related routes. */
	public readonly users = {
		profile: this.toApi('users/profile/'),
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
