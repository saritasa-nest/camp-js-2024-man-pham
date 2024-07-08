import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';

/**
 * HTTP client instance for making API requests.
 *
 * This Axios instance is pre-configured with the base URL from the application configuration.
 *
 * @type {AxiosInstance}
 */
export const http: AxiosInstance = axios.create({
	baseURL: CONFIG.apiUrl,
});
