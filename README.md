

# Next.js 15 Template with Shadcn, TailwindCSS, Drizzle, and NextAuth

This is a Next.js 15 template built with modern tools to speed up your development process. It integrates Shadcn for UI components, Tailwind CSS for styling, Drizzle as the TypeScript-first ORM, and NextAuth for authentication.

## Features

- **Next.js 15** - The latest features of Next.js with powerful, flexible API routes and components.
- **Shadcn** - Easily customizable and accessible UI components.
- **Tailwind CSS** - Rapidly build modern and responsive designs.
- **Drizzle ORM** - Type-safe ORM for seamless database interactions.
- **NextAuth** - Authentication made easy, with support for various providers.

## Getting Started

### Prerequisites

Ensure you have **Node.js** and **npm**  installed on your machine.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Proxy-o/Next.js15-Template-with-Shadcn-TailwindCSS-Drizzle-NextAuth
   cd nextjs-15-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   for me its better to use pnpm 
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Create a `.env` file at the root of the project and add the following environment variables:
```plaintext
# Authentication Secret
AUTH_SECRET="your_auth_secret_here"

# GitHub Authentication (NextAuth)
AUTH_GITHUB_ID="your_github_client_id"
AUTH_GITHUB_SECRET="your_github_client_secret"

# Database URL (using Drizzle with PostgreSQL)
DATABASE_URL="your_pg_link"
```

**Note**:
- Replace `your_auth_secret_here` with a secure random string for `AUTH_SECRET`.
- Replace `your_github_client_id` and `your_github_client_secret` with values from your GitHub OAuth application.
- Replace `your_pg_link`, with you link to db or you can use slqlite. 



4. Start the development server:
   ```bash
   npm run dev
   ```

### Folder Structure

- `src/app/` - Contains Next.js app router .
- `src/components/` - Shared UI components built with Shadcn.
- `src/hooks/` - Sharded custom hooks .
- `src/lib/` - Utility functions and configuration files.
- `src/db/` - Database schema and configurations for Drizzle.

## Configuration

- **Authentication**: Set up providers in the `src/auth.ts` configuration.
- **Database**: Define schema in `src/db/schema.ts` and use Drizzle ORM for database interactions .

## Deployment

To deploy this application, follow the instructions for deploying Next.js apps on [Vercel](https://vercel.com/) or any other cloud provider.

## Contributing

Feel free to open issues or submit pull requests if you’d like to contribute.

## License

This template is open source and available under the MIT License.
```
