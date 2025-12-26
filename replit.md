# Florence - Hair Braiding Specialist

## Overview

Florence is an expert hair braiding specialist website showcasing professional braiding services with appointment booking, testimonials, and an admin dashboard. The application features a modern React frontend with a polished design using custom typography (Playfair Display, Montserrat) and a sophisticated color scheme. The backend is built with Express and uses PostgreSQL for data persistence. Services include Box Braids, Knotless Braids, Cornrows, Goddess Braids, Twists & Senegalese, Bun Braids, Feed-in Braids, and Artistic Braiding.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom theme variables, shadcn/ui component library (New York style)
- **Animations**: Framer Motion for hero section animations
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a component-based architecture with pages in `client/src/pages/` and reusable components in `client/src/components/`. UI components from shadcn/ui are stored in `client/src/components/ui/`.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: HTTP server with Vite middleware for development, static file serving for production
- **API Design**: RESTful endpoints under `/api/` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL

The server handles appointments, contacts, testimonials, and gallery images with full CRUD operations. Routes are registered in `server/routes.ts` with database operations abstracted through `server/storage.ts`.

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` - contains all table definitions and Zod validation schemas
- **Tables**: users, appointments, contacts, testimonials, galleryImages
- **Migrations**: Generated via `drizzle-kit push` to `./migrations` directory

### Build System
- **Development**: Vite dev server with HMR, Express backend with tsx
- **Production**: Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **Scripts**: `npm run dev` for development, `npm run build` for production build

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- Drizzle ORM for type-safe database queries
- `connect-pg-simple` for session storage support

### UI Libraries
- Full shadcn/ui component library with Radix UI primitives
- Lucide React for icons
- Embla Carousel for image galleries
- date-fns for date formatting

### Development Tools
- Replit-specific Vite plugins for development banner and cartographer
- Custom meta images plugin for OpenGraph support