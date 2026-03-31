import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PageComponent } from '../../page/page.component';

@Component({
  selector: 'app-gambaran-umum',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './gambaran-umum.html',
  styles: [`:host { display: contents; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GambaranUmum {
  @Input() initialCapital!: number;
  @Input() goalsArray!: any[];
}
