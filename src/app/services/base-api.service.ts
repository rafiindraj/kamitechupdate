import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Generic base service for all HTTP operations.
 *
 * Follows Open/Closed Principle — this class provides a stable,
 * generic API surface. Domain-specific services (PdfService, etc.)
 * inject and use this service without modifying it.
 *
 * Usage:
 *   @Injectable({ providedIn: 'root' })
 *   export class PdfService {
 *     constructor(private readonly baseApi: BaseApiService) {}
 *     export(payload: PdfPayload) {
 *       return this.baseApi.post<{ downloadUrl: string }>(API_ENDPOINTS.pdf.export, payload);
 *     }
 *   }
 */
@Injectable({ providedIn: 'root' })
export class BaseApiService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Performs a GET request.
   */
  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, { params, headers });
  }

  /**
   * Performs a GET request for a single resource by ID.
   */
  getById<T>(url: string, id: string | number, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${url}/${id}`, { headers });
  }

  /**
   * Performs a POST request.
   */
  post<T>(url: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, { headers });
  }

  /**
   * Performs a PUT request (full resource replacement).
   */
  put<T>(url: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, { headers });
  }

  /**
   * Performs a PATCH request (partial update).
   */
  patch<T>(url: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(url, body, { headers });
  }

  /**
   * Performs a DELETE request.
   */
  delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { params, headers });
  }
}
