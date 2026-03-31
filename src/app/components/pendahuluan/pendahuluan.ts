import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageComponent } from '../../page/page.component';

@Component({
  selector: 'app-pendahuluan',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './pendahuluan.html',
  styles: [`:host { display: contents; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Pendahuluan {}
