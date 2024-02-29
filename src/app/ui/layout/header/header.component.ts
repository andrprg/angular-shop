import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatToolbarModule]
})
export class HeaderComponent {

}
