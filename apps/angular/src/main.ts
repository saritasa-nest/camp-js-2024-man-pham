import { enableProdMode } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';

import { provideRouter } from '@angular/router';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

import { appRoutes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [provideRouter(appRoutes), provideAnimationsAsync()],
}).catch(err => console.log(err));
