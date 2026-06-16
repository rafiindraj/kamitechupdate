import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { API_ENDPOINTS } from '../constants/endpoint.constant';

/**
 * Functional HTTP interceptor for global loading state management.
 *
 * Uses Angular's modern functional interceptor API (HttpInterceptorFn)
 * instead of the deprecated class-based HttpInterceptor.
 *
 * Excluded endpoints (e.g., PDF export) are handled manually
 * by their respective services.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);

  // Exclude endpoints that manage their own loading state
  if (req.url === API_ENDPOINTS.pdf.export) {
    return next(req);
  }

  loading.show();
  return next(req).pipe(finalize(() => loading.hide()));
};
