# KamiTech Business Plan & Financial Modeler

> *Built with love to help my partner brainstorm ideas and lay out a beautiful feasibility study for their final project. Because every great dream deserves a solid foundation, and every challenging project is a little easier with some support from someone who cares.* 💡❤️

KamiTech is an Angular-based web application designed to generate comprehensive business plans and financial projections. It provides an interactive interface for modeling company goals, operational expenses (OPEX), capital expenditures (CAPEX), team structures, and detailed financial forecasting (including EBITDA, ROI, and Cash Flow). The application also supports generating and downloading these projections as polished PDF documents.

## Features

- **Interactive Financial Modeling**: Dynamically calculate total revenue, COGS, gross profit, EBITDA, and net income based on adjustable parameters like billable hours.
- **Comprehensive Business Plan Sections**:
  - Introduction (Pendahuluan)
  - General Overview (Gambaran Umum)
  - Development Plan (Rencana Pembangunan)
- **Detailed Financial Projections**:
  - 5-Year Cash Flow Projections (Free Cash Flow, Operating Cash Flow)
  - Return on Investment (ROI) and Investment Metrics
  - Integrated Financial Statements
- **PDF Export**: Generate high-quality, print-ready PDF reports directly from the browser with customizable page selection.
- **Modern Tech Stack**: Built with Angular 21 (Standalone Components) and styled with Tailwind CSS for a responsive, modern UI.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v10 or higher)

### Installation

1. Navigate to the project directory:
   ```bash
   cd kamitechupdate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

To start the local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Project Structure

- `src/app/components/`: Contains UI components divided into business plan sections (`pendahuluan`, `gambaran-umum`, `rencana-pembangunan`).
- `src/app/services/`: Core business logic including the `FinancialModel` and `PdfService`.
- `src/app/models/`: TypeScript interfaces and types for financial data structures.
- `src/app/constants/`: Static configuration data (company goals, predefined expenses, default financial parameters).

## Building for Production

To build the project for production, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

- **Unit Tests**: Run `npm run test` to execute unit tests via Vitest.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
