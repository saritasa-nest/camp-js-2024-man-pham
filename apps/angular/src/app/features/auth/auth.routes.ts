import { Routes } from '@angular/router';
import { authGuard } from '@js-camp/angular/core/guards/auth.guard';

/** Routes object. */
export const authRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
		children: [
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
			{
				path: 'login',
				title: 'Login',
				loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
				canMatch: [authGuard({ isAuthorized: false })],
			},
			{
				path: 'register',
				title: 'Register',
				loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent),
				canMatch: [authGuard({ isAuthorized: false })],
			},
		],
	},
];
