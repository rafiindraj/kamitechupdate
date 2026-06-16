import { Injectable, ElementRef } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { LoadingService } from './loading.service';
import { API_ENDPOINTS } from '../constants/endpoint.constant';
import { PRINT_OPTIMIZER_CSS } from '../constants/web.constant';
import { PdfPayload } from '../models/pdf-payload.model';

/**
 * Service responsible for PDF generation and download.
 *
 * Follows Single Responsibility Principle — all PDF-related logic
 * (CSS extraction, HTML sanitization, API call, fallback handling)
 * is encapsulated here, keeping the App component lean.
 *
 * Depends on BaseApiService (Dependency Inversion) rather than
 * making raw HttpClient calls.
 */
@Injectable({ providedIn: 'root' })
export class PdfService {
  constructor(
    private readonly baseApi: BaseApiService,
    private readonly loading: LoadingService
  ) {}

  /**
   * Extracts the active CSS from all loaded stylesheets in the document.
   * Skips cross-origin stylesheets that block CSSRules access.
   */
  private extractActiveCSS(): string {
    let cssString = '';
    for (const stylesheet of document.styleSheets) {
      try {
        if (stylesheet.cssRules) {
          for (const rule of stylesheet.cssRules) {
            cssString += rule.cssText + '\n';
          }
        }
      } catch {
        console.warn('Skipped a cross-origin stylesheet');
      }
    }
    return cssString;
  }

  /**
   * Sanitizes Angular-generated HTML by removing dev-only attributes
   * that bloat the payload (ng-reflect-*, _ng*).
   */
  private sanitizeHtml(rawHtml: string): string {
    return rawHtml
      .replace(/ ng-reflect-[a-zA-Z0-9\-]+="[^"]*"/g, '')
      .replace(/ _ng[a-zA-Z0-9\-]+=""/g, '');
  }

  /**
   * Generates a PDF from the given content element by:
   * 1. Extracting active CSS from the document
   * 2. Sanitizing the element's innerHTML
   * 3. POSTing to the PDF export endpoint via BaseApiService
   * 4. Redirecting to the download URL on success
   * 5. Falling back to browser print on failure
   *
   * @param contentElement - The ElementRef wrapping the printable content (#pdfContent)
   */
  generateAndDownload(contentElement: ElementRef): void {
    const activeCss = this.extractActiveCSS();
    let rawHtml = contentElement?.nativeElement?.innerHTML || '';
    rawHtml = this.sanitizeHtml(rawHtml);

    const finalCss = activeCss + '\n' + PRINT_OPTIMIZER_CSS;

    const payload: PdfPayload = {
      css: finalCss,
      html: rawHtml,
    };

    this.loading.show();

    this.baseApi.post<{ downloadUrl: string }>(API_ENDPOINTS.pdf.export, payload).subscribe({
      next: (res) => {
        this.loading.hide();
        window.location.href = res.downloadUrl;
      },
      error: (err) => {
        this.loading.hide();
        console.warn('Backend PDF generation failed. Falling back to native browser print.', err);
        setTimeout(() => window.print(), 100);
      },
    });
  }
}
