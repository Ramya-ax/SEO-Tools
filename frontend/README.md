# SEO Analysis Tool Frontend

A modern, responsive React frontend for an SEO Analysis Tool, built with TypeScript and Tailwind CSS. This application is designed to be backend-agnostic and currently runs in a **mock environment** for demonstration purposes.

## features

- **5 Core Analysis Modules**: Overall Strategy, Product Analysis, Keyword Gaps, Keyword Research, and Monthly Plans.
- **Mock API Simulation**: Simulates network latency (1.5s) and backend responses.
- **Automatic Reporting**: Generates and downloads JSON reports for each module.
- **Responsive Design**: Mobile-friendly UI with professional SaaS aesthetics.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/     # Structural components (Navbar, etc.)
│   │   └── ui/         # Reusable UI components (ActionButtons, etc.)
│   ├── mocks/          # Static JSON data for mock API
│   ├── services/       # Centralized API handling
│   ├── types/          # TypeScript interfaces
│   ├── App.tsx         # Main application logic
│   └── main.tsx        # Entry point
└── ...
```

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Backend Integration Guide

The application is currently configured to use mock data. To connect it to your FastAPI backend:

1.  Open `src/services/api.ts`.
2.  Change the `USE_MOCK` constant to `false`:
    ```typescript
    const USE_MOCK = false; // Set to false to use real API
    ```
3.  Ensure your FastAPI server is running and accessible at the `API_BASE_URL` defined in the file (default: `/api`).
4.  The application expects the following endpoints to return JSON matching the `ReportData` interface:
    - `GET /api/overall-strategy`
    - `GET /api/product`
    - `GET /api/shared-missing-keywords`
    - `GET /api/keywords`
    - `GET /api/month-wise-plan`

## Technology Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
