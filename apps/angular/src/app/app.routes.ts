import { Routes } from '@angular/router';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./app.component').then(c => c.AppComponent),
		children: [
			{
				path: '',
				loadChildren: () =>
					import('./features/home/home.routes').then(c => c.homeRoutes),
			},
			{
				path: 'auth',
				loadChildren: () =>
					import('./features/auth/auth.routes').then(c => c.authRoutes),
			},
		],

	},
];
