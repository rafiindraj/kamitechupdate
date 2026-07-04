import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `
    @if (isLoading()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 print:hidden">
        <div class="bg-white p-4 rounded flex flex-col items-center gap-3 shadow-lg">
          <div class="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
          <div class="text-sm text-slate-700">Sedang memproses...</div>
        </div>
      </div>
    }
  `
})
export class LoadingComponent {
  private readonly loading = inject(LoadingService);
  readonly isLoading = this.loading.isLoading;
}

