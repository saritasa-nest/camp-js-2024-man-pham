/** Url config type. */
export type UrlConfig = { [key: string]: string | UrlConfig; } | string;

/**
 * Check if the given url parameter is in the url config.
 * @param url The url.
 * @param config The url config.
 */
export function isUrlInConfig(url: string, config: UrlConfig): boolean {
	if (typeof config === 'string') {
		return config === url;
	}

	for (const key of Object.keys(config)) {
		isUrlInConfig(url, config[key]);
	}

	return false;
}
