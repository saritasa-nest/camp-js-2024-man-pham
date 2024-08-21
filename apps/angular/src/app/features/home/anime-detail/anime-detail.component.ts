import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable, of } from 'rxjs';
import { AnimeDetails } from '@js-camp/core/models/anime-detail';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { AnimeGenre } from '@js-camp/core/models/anime-genre';
import { AnimeStudio } from '@js-camp/core/models/anime-studio';
import { MatDialog } from '@angular/material/dialog';

import { MatMiniFabButton } from '@angular/material/button';

import { MatIcon } from '@angular/material/icon';

import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { AnimeInformationComponent } from './anime-information/anime-information.component';

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

	/** Anime detail. */
	protected readonly animeDetails$: Observable<AnimeDetails | null> = this.animeId ?
		this.animeService.getAnimeDetail(this.animeId) :
		of(null);

	/**
	 * Get anime trailer based on its id.
	 * @param id Anime id.
	 */
	protected getAnimeTrailerUrl = (id: AnimeDetails['trailerUrl']): SafeResourceUrl =>
		this.domSanitizer.bypassSecurityTrustResourceUrl(`${EMBDED_LINK}${id}`);

	/**
	 * Join array of items into a string containing the item's name.
	 * @param array Array of items.
	 */
	protected getItemNameList(array: readonly AnimeGenre[] | readonly AnimeStudio[]): string {
		return array.map((item, index) => `${item.name}${index === array.length - 1 ? '' : ', '}`).join('');
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

	/** Go back to the previous page. */
	protected handleGoBack(): void {
		this.location.back();
	}
}
