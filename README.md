# Bike Tools

Just some bike stuff - [somebiketools.com](https://www.somebiketools.com)

# Run locally

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)
- Node.js v22.14.0 (will be setup using nvm)
- [pnpm](https://pnpm.io/) (package manager)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bike-tools.git
   cd bike-tools
   ```

2. Set the correct Node.js version:
   ```bash
   nvm use
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint to check code quality

## Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- Shadcn Component
- TanStack Router
