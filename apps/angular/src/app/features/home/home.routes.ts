import { Routes } from '@angular/router';

/** Routes object. */
export const homeRoutes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./anime-catalog/anime-catalog.component').then(c => c.AnimeCatalogComponent),

	},
];
