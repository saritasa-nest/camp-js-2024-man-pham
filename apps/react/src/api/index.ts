import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';

/** HTTP client instance for making API requests. */
export const http: AxiosInstance = axios.create({
	baseURL: CONFIG.apiUrl,
});
