/**
 * Configuration object for the application.
 *
 * This object contains various configuration settings used throughout the application.
 *
 * @type {Object}
 * @property {string} apiUrl - The base URL of the API used by the application.
 */
export const CONFIG = {
	apiUrl: import.meta.env.VITE_APP_API_BASE_URL ?? '',
};
