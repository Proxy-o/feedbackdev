# FeedbackDev

## 📖 Overview

This is an open-source web application built to explore and manage company profiles. Users can browse through detailed profiles, create new ones, and share their experiences via reviews and ratings. The project is powered by modern technologies for a seamless and intuitive experience.

### Key Features

- **Browse & Manage Companies**: View company profiles or create new ones effortlessly.
- **Detailed Reviews & Ratings**: Share your experiences with others through insightful reviews.
- **Modern Tech Stack**: Built with cutting-edge tools for performance and scalability.

---

## 🚀 Tech Stack

- **[Next.js 15](https://nextjs.org/)**: The React framework for production-grade applications.
- **[Drizzle ORM](https://orm.drizzle.team/)**: Type-safe SQL ORM for managing database interactions.
- **[ShadCN](https://shadcn.dev/)**: Flexible and customizable component library.
- **[Auth.js](https://authjs.dev/)**: Authentication library for handling secure logins and sessions.

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v18+ recommended).
- **Package Manager**: Use `pnpm`

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Proxy-o/feedbackdev.git
   cd feedbackdev
   ```

2. Install dependencies:

   ```bash
   pnpm install

   ```

3. Set up your `.env` file (see below).

4. Start the development server:

   ```bash
   pnpm run dev

   ```

5. Visit the application at [http://localhost:3000](http://localhost:3000).

---

## 📋 .env Configuration

Create a `.env` file in the root of your project with the following variables:

```plaintext
AUTH_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
AUTH_FORTY_TWO_CLIENT_ID=""
AUTH_FORTY_TWO_CLIENT_SECRET=""
AUTH_TRUST_HOST=http://localhost:3000
DATABASE_URL=""
```

### Environment Variable Descriptions

- `AUTH_SECRET`: A secret key used by Auth.js to sign session tokens.
- `AUTH_GITHUB_ID` & `AUTH_GITHUB_SECRET`: Credentials for GitHub OAuth.
- `AUTH_FORTY_TWO_CLIENT_ID` & `AUTH_FORTY_TWO_CLIENT_SECRET`: Credentials for 42 (École 42) OAuth.
- `AUTH_TRUST_HOST`: Trusted host URL for authentication callbacks.
- `DATABASE_URL`: Connection string for your database.

---

## 🤝 Contributing

We welcome contributions to improve this project! Here’s how you can help:

1. **Fork the Repository**:

   - Click the "Fork" button in the top-right corner of this repository.

2. **Clone Your Fork**:

   ```bash
   git clone https://github.com/proxy-o/feedbackdev.git
   ```

3. **Create a New Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**:

   - Add new features or fix bugs.

5. **Test Your Changes**:

   - Run `pnpm run dev` to test locally.

6. **Submit a Pull Request**:
   - Push your changes to your fork and open a pull request in the main repository.

### Guidelines

- Ensure your code passes all linting and tests before submitting.
- run `pnpm run build` before submitting

---

## 🧑‍💻 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software.

---
