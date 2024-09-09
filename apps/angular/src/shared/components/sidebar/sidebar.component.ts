import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AuthNavigatorComponent } from '../auth-navigator/auth-navigator.component';

/** Sidebar. */
@Component({
	selector: 'camp-sidebar',
	standalone: true,
	imports: [MatSidenavModule, AuthNavigatorComponent],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
