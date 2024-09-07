import { Routes } from '@angular/router';

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
			},
			{
				path: 'register',
				title: 'Register',
				loadComponent: () => import('./registration/registration.component').then(c => c.RegistrationComponent),
			},
		],
	},
];
