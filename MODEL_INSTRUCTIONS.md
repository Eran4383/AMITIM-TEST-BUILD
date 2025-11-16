# Amitim Activity Finder - Guide for AI Developers

Welcome to the Amitim Activity Finder project. This guide is intended for future AI models tasked with maintaining, updating, or extending this application. Please read it carefully to understand the project's structure and conventions.

**Your primary directive is to continue updating this file with any new architectural decisions, development patterns, or important instructions for the next AI model that will work on this code.**

## 1. Project Overview

*   **Purpose:** A client-side web application to help users find community activities based on various filters.
*   **Tech Stack:**
    *   **Framework:** React 18+ (using functional components and hooks)
    *   **Language:** TypeScript
    *   **Styling:** Tailwind CSS (loaded via CDN in `index.html`). **No other styling methods are used.**
    *   **Data:** Static data is stored in `data/activities.ts`.
    *   **API:** Google Gemini API is used for the "Smart Search" feature.

## 2. Project Structure

The project follows a clear separation of concerns:

*   **/ (root):**
    *   `index.html`: The main HTML entry point for development.
    *   `index.tsx`: Renders the React application into the DOM during development.
    *   `App.tsx`: The main component. It holds the application state and orchestrates all other components.
    *   `types.ts`: Contains all shared TypeScript interfaces and types (`Activity`, `FilterState`, etc.).
    *   `metadata.json`: Basic app information.
*   **`components/`**: Reusable UI components.
    *   `icons/`: SVG icons converted into React components.
*   **`data/`**: Contains the static data for the application.
    *   `activities.ts`: The primary dataset, exported as a typed array.
*   **`services/`**: Handles external API calls.
    *   `geminiService.ts`: Contains the logic for the "Smart Search" feature.
*   **`utils/`**: Helper functions that are pure and can be used across the application.
    *   `parsers.ts`: Functions to parse data from the dataset (e.g., age groups, prices).
*   **`docs/`**: This is the **deployment directory**. It contains the compiled, production-ready version of the application.

## 3. Development Workflow

The development process you should follow is:

1.  **Understand the Request:** Analyze the user's request to change or add a feature.
2.  **Plan the Implementation:**
    *   Which source files (`.ts`, `.tsx`) need to be modified?
    *   Do you need new components, types, or services?
    *   How will the UI/UX be affected?
3.  **Implement the Changes:**
    *   Modify the **source files** in the root directory and its subdirectories (`components`, `services`, etc.).
    *   **State Management:** All primary filter states are managed in `App.tsx` within the `filters` state object. Changes are propagated down to components via props, and updates are sent up via the `onFilterChange` callback.
    *   **Filtering Logic:** The core filtering logic resides within a `useMemo` hook in `App.tsx`.
4.  **Perform the Build Process:** After changing the source files, you **must** generate the corresponding production-ready files in the `docs/` directory. This is a critical and mandatory step.
5.  **Generate the Output:** Provide all changed files (both source and compiled) in the required single XML block format.

## 4. Key Concepts & Patterns

### State Management

The application uses a centralized state model in `App.tsx`. The `filters` object holds the current state of all user-selected filters.

*   **To add a new filter:**
    1.  Update the `FilterState` interface in `types.ts`.
    2.  Add the new property to the initial state in `App.tsx`.
    3.  Add the UI for the new filter in `components/FilterBar.tsx` or `components/AdvancedFilters.tsx`.
    4.  Update the filtering logic in the `useMemo` hook in `App.tsx`.
    5.  **Remember to run the build process** to reflect these changes in the `docs/` directory.

### Smart Search (Gemini API)

The `services/geminiService.ts` file isolates the Gemini API logic. It's designed to be **fault-tolerant**. If the API key is missing or an API call fails, it returns an empty array `[]`, allowing the app to fall back to a standard text search without crashing.

## 5. Build & Deployment

**This is a mandatory part of your workflow.**

The `docs/` directory contains the final, static output of the application, ready to be deployed on services like GitHub Pages. You are responsible for creating and updating these files.

**Build Process Steps:**
For every source file (`.ts` or `.tsx`) that you create or modify, you must also create or update its compiled JavaScript equivalent (`.js`) inside the `docs/` directory, maintaining the same folder structure.

The "compilation" process involves:
1.  **Removing TypeScript:** All type annotations, interfaces, and type declarations must be removed (e.g., `: string`, `interface Activity`, `React.FC`).
2.  **Updating Imports:** All import paths must be updated to point to the `.js` files instead of the source files. For example, `import { Header } from './components/Header'` becomes `import { Header } from './components/Header.js'`.
3.  **Updating HTML:** The `docs/index.html` file must reference the main JavaScript file, `index.js`, not `index.tsx`.

You must always provide both the changed source files and their corresponding compiled versions in the `docs/` directory.

---
**Note to the next AI:** This document is critical for project continuity. Before making any changes, review this guide. After implementing significant changes, **update this document** to reflect the new state of the application.