import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PdfPayload } from '../models/pdf-payload.model';
import { API_ENDPOINTS } from '../constants/endpoint';

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) { }

    get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.http.get<T>(url, { params, headers });
    }

    post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(url, body, { headers });
    }

    put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.put<T>(url, body, { headers });
    }

    delete<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.http.delete<T>(url, { params, headers });
    }

    // Convenience method with explicit typing for PDF export
    postPdfExport(payload: PdfPayload): Observable<{ downloadUrl: string }> {
        return this.post<{ downloadUrl: string }>(API_ENDPOINTS.pdfExport, payload);
    }
}
