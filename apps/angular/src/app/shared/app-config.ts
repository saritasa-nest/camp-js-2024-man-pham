import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/** Works with environment variables. */
@Injectable({ providedIn: 'root' })
export class AppConfig {

	/** Api url. */
	public readonly apiUrl = environment.apiUrl;

	/** Api key. */
	public readonly apiKey = environment.apiKey;
}
