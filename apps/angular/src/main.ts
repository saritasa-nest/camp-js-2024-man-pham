import { enableProdMode } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';

import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

import { appRoutes } from './app/app.routes';
import { ApiKeyInterceptor } from './core/interceptors/api-key.interceptor';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes),
		provideAnimationsAsync(),
		provideHttpClient(withInterceptorsFromDi()),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiKeyInterceptor,
			multi: true,
		},
	],
}).catch(err => console.error(err));
