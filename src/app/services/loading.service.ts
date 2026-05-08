import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingCount = 0;
  private subject = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.subject.asObservable();

  show() {
    this.loadingCount += 1;
    if (this.loadingCount > 0) this.subject.next(true);
  }

  hide() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) this.subject.next(false);
  }

  reset() {
    this.loadingCount = 0;
    this.subject.next(false);
  }
}
