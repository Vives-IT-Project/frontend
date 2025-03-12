# IT Project - Frontend

Welcome to the frontend repository! This project is built using **React**, **TypeScript**, and **Tailwind CSS**. Below are the steps to set up your development environment.

---

## 📌 Prerequisites

Before setting up the project, make sure you have the following installed:

- **[Node.js](https://nodejs.org/)**
  - Use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions:
    ```sh
    nvm install
    nvm use
    ```
- **[pnpm](https://pnpm.io/)** (Package manager, alternative to npm/yarn)
  ```sh
  npm install -g pnpm
  ```

---

## ⚙️ Installation

1️⃣ **Clone the repository**

```sh
git clone https://github.com/Vives-IT-Project/frontend.git
cd frontend
```

2️⃣ **Install dependencies**

```sh
pnpm install
```

3️⃣ **Start the development server**

```sh
pnpm dev
```

This will start the development server and make the application available at `http://localhost:5173/` (or another available port).

---

## ✨ Code Formatting & Linting

To ensure a consistent code style, this project uses:

- **Prettier** – for automatic code formatting
- **ESLint** – for enforcing coding standards
- **EditorConfig** – for consistent indentation across different editors

### ✅ Formatting on Save

To automatically format code on save in **VS Code**, add this to your **settings.json**:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 🔌 Recommended VS Code Extensions

To improve your development experience, we recommend installing the following **VS Code extensions**:

1. **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** – Automatically highlights and fixes lint errors.
2. **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)** – Ensures code formatting consistency.
3. **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)** – Provides autocompletion and linting for Tailwind classes.
4. **[EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)** – Helps enforce indentation and line endings.
5. **[PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)** – Improves support for PostCSS configuration.

---

## 🛠 Troubleshooting

### 🔹 Formatting doesn't work in VS Code

Make sure you have installed the **Prettier** and **ESLint** extensions and that `"editor.formatOnSave": true` is enabled in **settings.json**.

---
