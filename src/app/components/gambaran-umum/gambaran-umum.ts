import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { PageComponent } from '../../page/page.component';
import { GoalItem } from '../../models/financial.model';

@Component({
  selector: 'app-gambaran-umum',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './gambaran-umum.html',
  styles: [`:host { display: flex; flex-direction: column; gap: 3rem; } @media print { :host { gap: 0; } }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GambaranUmumComponent {
  readonly initialCapital = input.required<number>();
  readonly goalsArray = input.required<readonly GoalItem[]>();
}


