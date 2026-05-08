import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { API_ENDPOINTS } from '../constants/endpoint';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loading: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exclude endpoints that should not trigger the global loader
    if (req.url === API_ENDPOINTS.pdfExport) {
      return next.handle(req);
    }

    this.loading.show();
    return next.handle(req).pipe(finalize(() => this.loading.hide()));
  }
}
