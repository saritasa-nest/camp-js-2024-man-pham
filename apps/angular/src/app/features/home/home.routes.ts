import { Routes } from '@angular/router';
import { authGuard } from '@js-camp/angular/core/guards/auth.guard';

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
			{
				path: 'anime/:id',
				title: 'Anime Detail',
				loadComponent: () =>
					import('./anime-detail/anime-detail.component').then(c => c.AnimeDetailComponent),
				canMatch: [authGuard({ isAuthorized: true })],
			},
		],
	},
];
