import { Routes } from '@angular/router';

import { authGuard } from '../core/guards/auth.guard';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./features/auth/auth.routes').then(c => c.authRoutes),
		canMatch: [authGuard({ isAuthorized: false })],
	},
	{
		path: '',
		loadChildren: () => import('./features/home/home.routes').then(c => c.homeRoutes),
		canMatch: [authGuard({ isAuthorized: true })],
	},
];
