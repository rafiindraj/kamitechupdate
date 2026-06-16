/**
 * Centralized API endpoint configuration.
 *
 * All API URLs are defined here as a single source of truth.
 * Grouped by domain for scalability — new feature domains
 * get their own namespace without modifying existing ones (OCP).
 *
 * Usage:
 *   import { API_ENDPOINTS } from '@app/constants/endpoint.constant';
 *   this.baseApi.post(API_ENDPOINTS.pdf.export, payload);
 */

const BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  pdf: {
    export: `${BASE_URL}/pdf/export`,
  },
  // Future endpoint groups:
  // auth: {
  //   login: `${BASE_URL}/auth/login`,
  //   register: `${BASE_URL}/auth/register`,
  // },
  // project: {
  //   list: `${BASE_URL}/projects`,
  //   detail: (id: string) => `${BASE_URL}/projects/${id}`,
  // },
} as const;
