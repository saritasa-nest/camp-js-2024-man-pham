import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { genresSlice } from './genre/slice';

/**
 * Redux store configuration.
 *
 * Configures the Redux store with the genres slice reducer and custom middleware.
 * Disables serializability middleware to allow ES6 classes in Redux state.
 *
 * @constant
 */
export const store = configureStore({
	reducer: {
		genres: genresSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			// We need to disable this check to allow ES6 classes in Redux.
			// You can find more info about this middleware in docs:
			// https://redux-toolkit.js.org/api/serializabilityMiddleware
			serializableCheck: false,
		}),
});

/**
 * Type representing the root state of the Redux store.
 *
 * Uses ReturnType to infer the type from store.getState().
 *
 * @type {RootState}
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type representing the dispatch function of the Redux store.
 *
 * Uses typeof to infer the type from store.dispatch.
 *
 * @type {AppDispatch}
 */
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

/**
 * Custom hook for accessing the Redux store state, typed with RootState.
 *
 * @type {TypedUseSelectorHook<RootState>}
 * @returns {TypedUseSelectorHook<RootState>} The selector hook for accessing the Redux store state.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
