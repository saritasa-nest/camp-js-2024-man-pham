import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

/**
 * Array of route objects representing genres-related routes.
 *
 * @type {RouteObject[]}
 */
export const genresRoutes: RouteObject[] = [
	{
		path: 'genres',
		element: <GenresPage />,
	},
	{
		path: '*',
		element: <Navigate to='GenresPage' />,
	},
];
