# Project Overview

A Next.js 15 todo list application with Supabase authentication and real-time data syncing. Features dark mode support and Row Level Security (RLS) for data protection.

## Tech Stack

### Frontend
- **Next.js 15.5.4** - React framework (Pages Router)
- **React 19.2.0** - UI library
- **TypeScript 4.9.5** - Type safety
- **Tailwind CSS 3.4** - Styling and responsive design
- **next-themes 0.4.6** - Dark/light mode toggle

### Backend & Auth
- **Supabase 2.8.0** - Backend-as-a-Service
  - Hosted Postgres database
  - RESTful API
  - Authentication with JWT
- **@supabase/auth-helpers-react 0.3.1** - React auth integration
- **@supabase/auth-ui-react 0.2.8** - Pre-built auth UI components

## Project Structure

```
/
├── components/
│   ├── TodoList.tsx        # Main todo CRUD component
│   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   └── ThemeProvider.tsx   # Theme context wrapper
├── lib/
│   ├── initSupabase.ts     # Supabase client initialization
│   └── schema.ts           # TypeScript database schema types
├── pages/
│   ├── _app.tsx            # App wrapper with providers
│   ├── _document.tsx       # Custom document
│   ├── index.tsx           # Main page (login/todo list)
│   └── api/
│       └── hello.ts        # Example API route
├── styles/
│   ├── tailwind.css        # Tailwind input
│   └── app.css             # Compiled CSS output
└── .env.local              # Environment variables (not in repo)
```

## Core Features

### Authentication
- Email/password authentication via Supabase Auth UI
- Session management with `@supabase/auth-helpers-react`
- Automatic JWT token handling
- Login/logout functionality
- Protected routes (todo list only accessible when authenticated)

**Flow:**
1. Unauthenticated users see login form (`pages/index.tsx:23-33`)
2. Auth handled by `<Auth>` component with ThemeSupa theme
3. Session managed via `SessionContextProvider` in `_app.tsx`
4. Authenticated users see todo list and logout button

### Todo List (CRUD)
**Location:** `components/TodoList.tsx`

**Operations:**
- **Create:** Add new todos with task text validation (`addTodo()` at line 29)
- **Read:** Fetch all todos on mount, ordered by ID (`fetchTodos()` at line 16)
- **Update:** Toggle completion status via checkbox (`toggle()` at line 96)
- **Delete:** Remove todos with confirmation (`deleteTodo()` at line 47)

**Features:**
- Real-time updates with optimistic UI
- Error handling with alert display
- Input validation (task length > 3 chars enforced by DB)
- User-specific todos (filtered by `user_id`)

### Dark Mode
**Implementation:**
- Uses `next-themes` for system/manual theme detection
- Theme toggle in top-right corner (`components/ThemeToggle.tsx`)
- Tailwind's `dark:` classes for styling
- Theme persisted in localStorage
- Supports system preference detection

### Database Schema
**Table:** `todos` (defined in `lib/schema.ts`)

```typescript
{
  id: number (auto-increment primary key)
  user_id: string (references auth.users)
  task: string (min 3 chars)
  is_complete: boolean (default: false)
  inserted_at: timestamp (auto UTC)
}
```

### Row Level Security (RLS)
Postgres RLS policies ensure users can only access their own todos:
- **INSERT:** Users can create todos with their own `user_id`
- **SELECT:** Users can only view their own todos
- **UPDATE:** Users can only update their own todos
- **DELETE:** Users can only delete their own todos

Policies check: `(select auth.uid()) = user_id`

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

**Note:** The `anon` key enables anonymous access until login, then switches to user's JWT token for RLS.

## Development Workflow

### Setup
1. Create Supabase project at https://supabase.com/dashboard
2. Run "Todo List" quickstart in SQL editor
3. Copy project URL and anon key to `.env.local`
4. Install dependencies: `npm install`

### Running Locally
```bash
npm run dev              # Start dev server + Tailwind watcher
npm run dev:css          # Watch Tailwind changes only
npm run build            # Production build
npm run build:css        # Build Tailwind CSS
npm start                # Start production server
npm run lint             # Run ESLint
```

**Dev server runs on:** http://localhost:3000

### Styling
- Tailwind processes `styles/tailwind.css` → `styles/app.css`
- Uses `concurrently` to run Tailwind watcher alongside Next.js
- Custom dark mode classes via Tailwind's class strategy

## Key Files Explained

### `pages/index.tsx`
- Main entry point
- Conditionally renders login or todo list based on session
- Handles logout functionality
- Includes theme toggle in top-right corner

### `components/TodoList.tsx`
- Complete todo CRUD implementation
- Three components: `TodoList` (main), `Todo` (item), `Alert` (errors)
- Uses Supabase client from `auth-helpers-react`
- Type-safe with database schema types

### `lib/initSupabase.ts`
- Initializes Supabase client with environment variables
- Exported singleton used throughout app

### `pages/_app.tsx`
- Wraps app with `SessionContextProvider` for auth state
- Wraps with `ThemeProvider` for dark mode
- Imports global Tailwind CSS

## Deployment

### Vercel (Recommended)
1. Deploy via Vercel button (auto-configures Supabase integration)
2. Environment variables set automatically
3. Preview branches get dedicated Supabase projects

### Manual Deployment
1. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in hosting platform
2. Run `npm run build`
3. Deploy `.next` folder

## Database Setup

### Option 1: Quickstart (Recommended)
Use Supabase Dashboard SQL Editor → "TODO LIST: Build a basic todo list with Row Level Security"

### Option 2: Manual Setup
```sql
-- Create todos table
create table todos (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  task text check (char_length(task) > 3),
  is_complete boolean default false,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table todos enable row level security;

-- Create policies
create policy "Individuals can create todos." on todos for
  insert with check ((select auth.uid()) = user_id);

create policy "Individuals can view their own todos." on todos for
  select using ((select auth.uid()) = user_id);

create policy "Individuals can update their own todos." on todos for
  update using ((select auth.uid()) = user_id);

create policy "Individuals can delete their own todos." on todos for
  delete using ((select auth.uid()) = user_id);
```

## Security Notes

- **Never commit `.env.local`** - contains sensitive keys
- **Never use `service_role` key client-side** - bypasses RLS
- **Always use `anon` key for client** - respects RLS policies
- RLS automatically filters data based on authenticated user's JWT
