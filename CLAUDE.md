# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A spending management web application built with Next.js 16, Supabase (PostgreSQL), and Ant Design. Users can track income and expenses, view statistics by week/month/year, and visualize spending patterns with charts.

**Key Features:**
- Transaction management (add, view income/expense)
- Time-based statistics (Week/Month/Year views)
- Bar chart visualization using Recharts
- Mobile-responsive design
- Cloud-hosted database accessible from any device

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1 (new @theme syntax)
- **UI Components**: Ant Design 6.2.2 (Modal, DatePicker, Select, Radio, Input)
- **Database**: Supabase (PostgreSQL) with @supabase/ssr
- **Charts**: Recharts 3.7
- **Date Handling**: date-fns 4.1

## Commands

### Development
```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Run ESLint
```

### Debugging
```bash
npx kill-port 3000   # Kill process on port 3000
rm -rf .next         # Clear Next.js cache (fixes Turbopack issues)
```

## Architecture

### Next.js App Router Pattern

This project uses **Next.js App Router** (not Pages Router). Key architectural patterns:

1. **Client vs Server Components**:
   - Main page (`src/app/page.tsx`) is a **Client Component** (`'use client'`) for state management
   - Uses `useState`, `useEffect` for fetching transactions
   - All UI components in `src/components/` are Client Components for interactivity

2. **API Routes**:
   - Located in `src/app/api/transactions/route.ts`
   - Exports async `GET` and `POST` functions (not default exports)
   - Uses `@supabase/ssr` server client with async cookie handling
   - **CRITICAL**: In Next.js 16, `cookies()` is async and must be awaited

3. **Supabase Integration**:
   - **Client-side**: `src/lib/supabase/client.ts` uses `createBrowserClient`
   - **Server-side**: `src/lib/supabase/server.ts` uses `createServerClient` with async cookies
   - Server client is used in API routes, client is for direct client-side operations

### Data Flow

```
Browser → Client Component (page.tsx)
         ↓ fetch('/api/transactions')
         → API Route (route.ts)
         → Supabase Server Client
         → PostgreSQL Database
```

### Component Architecture

```
src/
├── app/
│   ├── page.tsx              # Main page (Client Component with state)
│   ├── layout.tsx            # Root layout with Ant Design ConfigProvider
│   ├── globals.css           # Tailwind v4 @theme config
│   └── api/transactions/
│       └── route.ts          # GET/POST handlers
├── components/
│   ├── Header.tsx            # Purple gradient header
│   ├── BalanceCard.tsx       # Balance display
│   ├── StatsTabs.tsx         # Week/Month/Year tabs + summary + chart
│   ├── StatsSummary.tsx      # Income/Expense/Savings cards
│   ├── TransactionChart.tsx  # Recharts bar chart
│   ├── TransactionList.tsx   # List container + Add button
│   ├── TransactionItem.tsx   # Individual transaction row
│   └── AddTransactionModal.tsx # Ant Design modal form
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser client
│   │   └── server.ts         # Server client (async cookies)
│   └── utils/
│       ├── calculations.ts   # Balance, statistics calculations
│       ├── dateHelpers.ts    # Week/Month/Year date ranges
│       └── formatters.ts     # Currency formatting, category icons
└── types/
    ├── transaction.ts        # Transaction, TransactionType, Category types
    └── statistics.ts         # StatsPeriod, Statistics, ChartDataPoint types
```

## Database Setup

### Supabase Configuration

1. **Environment Variables** (`.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

2. **Database Schema** (`transactions` table):
   ```sql
   CREATE TABLE transactions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
     description VARCHAR(255) NOT NULL,
     amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
     date DATE NOT NULL,
     category VARCHAR(50) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE INDEX idx_transactions_date ON transactions(date DESC);
   CREATE INDEX idx_transactions_type ON transactions(type);
   ```

3. **Row-Level Security (RLS)**:
   - **MUST be disabled** for MVP (no authentication):
     ```sql
     ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
     ```
   - If RLS is enabled, POST requests will fail with error code `42501`

### Transaction Categories
- Work & Salary
- Food & Dining
- Shopping
- Transportation
- Entertainment
- Bills & Utilities
- Other

## Styling System

### Tailwind CSS v4
- Uses new `@theme` syntax in `globals.css` (NOT `@layer` or `@apply`)
- Custom colors defined as CSS variables:
  ```css
  @theme {
    --color-primary: #667eea;
    --color-secondary: #764ba2;
    --color-income: #10b981;
    --color-expense: #ef4444;
    --color-background: #f5f7fa;
  }
  ```

### Ant Design Theming
- Configured in `layout.tsx` via `ConfigProvider`
- Theme token: `colorPrimary: '#667eea'`
- Components automatically styled to match purple brand color

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Grid layouts collapse to single column on mobile: `grid-cols-1 sm:grid-cols-3`

## Common Issues & Solutions

### 1. Turbopack Errors
**Symptom**: Continuous "FATAL: Turbopack error" messages, page stuck rebuilding

**Solution**:
```bash
npx kill-port 3000
rm -rf .next
npm run dev
```

### 2. Supabase Connection Timeout
**Symptom**: `ConnectTimeoutError` or `TypeError: fetch failed`

**Solution**: Verify `.env.local` has correct Supabase URL and anon key. The project ref in the JWT payload should match the URL subdomain.

### 3. Row-Level Security Error
**Symptom**: POST requests fail with `"new row violates row-level security policy"`

**Solution**: Run in Supabase SQL Editor:
```sql
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
```

### 4. Next.js 16 Async Cookies Error
**Symptom**: `cookies() returns a Promise and must be unwrapped with await`

**Solution**: Ensure `src/lib/supabase/server.ts` has:
```typescript
export const createClient = async () => {
  const cookieStore = await cookies();  // Must await
  // ...
}
```

And API routes call:
```typescript
const supabase = await createClient();  // Must await
```

## Key Patterns

### 1. State Management
- Main page holds transactions state and fetches from API
- Pass `fetchTransactions` callback to child components for refreshing after mutations
- Use `useMemo` for expensive calculations (e.g., statistics)

### 2. API Response Format
```typescript
// Success
{ data: [...], statusCode: 200, message: "Success" }

// Error
{ error: "Error message", statusCode: 500 }
```

### 3. Date Filtering
- Use `date-fns` for all date operations
- Helpers in `dateHelpers.ts` return `{ startDate, endDate }` as ISO strings
- API accepts query params: `?startDate=...&endDate=...&type=...`

### 4. Component Props Pattern
- Use TypeScript interfaces for all props
- Client Components should handle their own loading/error states
- Pass data down, callbacks up

## Development Notes

- **Never use `@apply` in CSS**: Tailwind v4 removed support, use inline classes instead
- **All Supabase operations**: Must use appropriate client (browser vs server)
- **Form validation**: Handled in both client (UI) and server (API route)
- **Error handling**: Always try-catch async operations and log errors
- **Loading states**: Show Ant Design `<Spin>` component during data fetching

## Design System

See `DESIGN_SPEC.md` for complete design specifications including:
- Color palette (purple gradient theme)
- Typography and spacing system
- Component designs and interactions
- Icon/emoji mapping for categories
- Responsive breakpoints
