import { Routes } from '@angular/router';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		loadChildren: () => import('./features/home/home.routes').then(c => c.homeRoutes),
	},
	{
		path: 'auth',
		loadChildren: () => import('./features/auth/auth.routes').then(c => c.authRoutes),
	},
];
