/**
 * Granular interfaces for all financial-related domain entities.
 * Follows Interface Segregation Principle — each consumer only
 * depends on the interface it actually needs.
 */

/** A single OPEX breakdown line item. */
export interface OpexDetailItem {
  readonly item: string;
  readonly detail?: string;
  readonly amount: number;
}

/** A single row in the tenaga kerja (workforce) table. */
export interface TenagaKerjaItem {
  readonly role: string;
  readonly count: number;
  readonly salary: string;
}

/** A market analysis section with either a bullet list or paragraph content. */
export interface MarketAnalysisItem {
  readonly title: string;
  readonly list?: string[];
  readonly content?: string;
}

/** A company goal with title and description. */
export interface GoalItem {
  readonly title: string;
  readonly desc: string;
}

/** A single month in the ROI projection table. */
export interface RoiProjectionItem {
  readonly month: string;
  readonly revenue: number;
  readonly cumulative: number;
  readonly isBEP: boolean;
}

/** A single year in the 5-year cash flow projection. */
export interface YearlyCashFlowItem {
  readonly year: number;
  readonly revenue: number;
  readonly cogs: number;
  readonly grossProfit: number;
  readonly opex: number;
  readonly ebitda: number;
  readonly depreciation: number;
  readonly ebit: number;
  readonly tax: number;
  readonly netIncome: number;
  readonly operatingCF: number;
  readonly capex: number;
  readonly fcf: number;
  readonly cumulative: number;
}

/** A single row in the cash flow table display. */
export interface CashFlowTableRow {
  readonly label: string;
  readonly isBold: boolean;
  readonly isHeader: boolean;
  readonly isHighlight: boolean;
  readonly y1: number;
  readonly y2: number;
  readonly y3: number;
  readonly y4: number;
  readonly y5: number;
}
