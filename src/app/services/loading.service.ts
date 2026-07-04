import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingCount = 0;
  private readonly _isLoading = signal<boolean>(false);
  readonly isLoading = this._isLoading.asReadonly();

  show() {
    this.loadingCount += 1;
    if (this.loadingCount > 0) this._isLoading.set(true);
  }

  hide() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) this._isLoading.set(false);
  }

  reset() {
    this.loadingCount = 0;
    this._isLoading.set(false);
  }
}

