import { memo, FC } from 'react';
import { Genre } from '@js-camp/core/models/genre';

import styles from './GenreCard.module.css';

type Props = {

	/** Genre. */
	readonly genre: Genre;
};

/** Card with genre data. */
const GenreCardComponent: FC<Props> = ({ genre }: Props) => (
	<div className={styles.card}>
		<h2>{genre.name}</h2>
		<span>Id - {genre.id}</span>
	</div>
);

/**
 * Memoized Genre Card component.
 *
 * Memoizes the GenreCard Component to optimize rendering performance by
 * preventing unnecessary re-renders when props do not change.
 *
 * @constant
 */
export const GenreCard = memo(GenreCardComponent);
