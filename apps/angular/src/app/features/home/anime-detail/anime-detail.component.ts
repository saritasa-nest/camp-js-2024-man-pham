import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { BehaviorSubject, defer, finalize, Observable, of } from 'rxjs';
import { AnimeDetail } from '@js-camp/core/models/anime-detail';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnimeGenre } from '@js-camp/core/models/anime-genre';
import { AnimeStudio } from '@js-camp/core/models/anime-studio';
import { MatDialog } from '@angular/material/dialog';

import { MatMiniFabButton } from '@angular/material/button';

import { MatIcon } from '@angular/material/icon';

import { SkeletonDirective } from '@js-camp/angular/shared/directives/skeleton/skeleton.directive';

import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { AnimeInformationComponent } from './anime-information/anime-information.component';
import { AnimeNotFoundComponent } from './anime-not-found/anime-not-found.component';

const EMBDED_LINK = 'https://www.youtube.com/embed/';

/** Anime detail component. */
@Component({
	selector: 'camp-anime-detail',
	standalone: true,
	imports: [
		AsyncPipe,
		MatCardModule,
		NoEmptyPipe,
		MatTabsModule,
		DatePipe,
		AnimeInformationComponent,
		RouterLink,
		MatMiniFabButton,
		MatIcon,
		SkeletonDirective,
		MatProgressSpinnerModule,
		AnimeNotFoundComponent,
	],
	templateUrl: './anime-detail.component.html',
	styleUrl: './anime-detail.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailComponent {
	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	private readonly animeId = this.route.snapshot.paramMap.get('id');

	private readonly domSanitizer = inject(DomSanitizer);

	private readonly dialog = inject(MatDialog);

	private readonly location = inject(Location);

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject(true);

	/** Anime detail. */
	protected readonly animeDetail$: Observable<AnimeDetail | null>;

	public constructor() {
		this.animeDetail$ = defer(() => (this.animeId ? this.animeService.getAnimeDetail(this.animeId) : of(null))).pipe(
			finalize(() => this.isLoading$.next(false)),
		);
	}

	/**
	 * Get anime trailer based on its id.
	 * @param id Anime id.
	 */
	protected getAnimeTrailerUrl = (id: AnimeDetail['trailerUrl']): SafeResourceUrl =>
		this.domSanitizer.bypassSecurityTrustResourceUrl(`${EMBDED_LINK}${id}`);

	/**
	 * Join array of items into a string containing the item's name.
	 * @param array Array of items.
	 */
	protected getItemNameList(array: readonly AnimeGenre[] | readonly AnimeStudio[]): string {
		return array.map(item => item.name).join(', ');
	}

	/**
	 * Opens an image dialog.
	 * @param imageSource The source URL.
	 * @param title The title.
	 */
	protected openImageDialog(imageSource: string | null, title: string): void {
		this.dialog.open(ImageDialogComponent, {
			data: { source: imageSource, title },
			height: '80vh',
		});
	}

	/**
	 * Handles a keydown event on a image.
	 * @param event The keyboard event.
	 * @param imageSource Image source.
	 * @param title Japanese title.
	 */
	protected handleKeydown(event: KeyboardEvent, imageSource: string | null, title: string): void {
		if (event.key === 'Enter') {
			this.openImageDialog(imageSource, title);
		}
	}

	/** Go back to the previous page. */
	protected handleGoBack(): void {
		this.location.back();
	}
}
