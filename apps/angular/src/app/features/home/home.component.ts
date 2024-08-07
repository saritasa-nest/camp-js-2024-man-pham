import { Component } from '@angular/core';

import { SidebarComponent } from '@js-camp/angular/shared/components/sidebar/sidebar.component';

import { RouterModule } from '@angular/router';

/** Home component. */
@Component({
	selector: 'camp-home',
	templateUrl: './home.component.html',
	imports: [RouterModule, SidebarComponent],
	standalone: true,
})
export class HomeComponent {}
