import { Routes } from '@angular/router';

/** Routes object. */
export const authRoutes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		title: 'Login',
		loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
	},
	{
		path: 'register',
		title: 'Register',
		loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent),
	},
];
