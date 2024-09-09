import { Routes } from '@angular/router';

/** Routes object. */
export const homeRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./home.component').then(c => c.HomeComponent),
		children: [
			{
				path: '',
				title: 'Anime Catalog',
				loadComponent: () => import('./anime-catalog/anime-catalog.component').then(c => c.AnimeCatalogComponent),
			},
		],
	},
];
