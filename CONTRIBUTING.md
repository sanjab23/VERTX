# Contributing to VertX

Thank you for your interest in contributing to **VertX**, an academic open-source project engineered by **Jagan** at **New Horizon College**, Kasturi Nagar, Bangalore (Academic Year 2026–2027).

VertX is built on the philosophy of 100% client-side WebAssembly execution, preserving user data privacy by processing media and documents entirely in transient browser memory.

---

## 🛠️ Development Setup

VertX uses the high-performance [Bun](https://bun.sh) runtime along with Vite and Svelte 5.

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/jagan-dev/vert-converter.git
cd vert-converter

# Install dependencies using Bun
bun install

# Start the local development server
bun run dev
```

Open `http://localhost:5173` to preview the local environment.

### 2. Code Quality & Verification

Before submitting pull requests or committing changes, verify code quality:

```bash
# Format code with Prettier
bun run format

# Run Svelte type-checking
bun run check

# Run ESLint validation
bun run lint

# Test production static build
bun run build
```

---

## 📐 Contribution Guidelines

1. **Commit Messages**: Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g., `feat:`, `fix:`, `docs:`, `refactor:`).
2. **Svelte 5 Runes**: VertX is built with modern Svelte 5. Use runes (`$state`, `$derived`, `$effect`, `$props`) instead of legacy Svelte 3/4 stores where applicable.
3. **WebAssembly Integrity**: Ensure all media processing remains client-side. Do not introduce server dependencies or remote telemetry services.
4. **Zero Hardcoded Secrets**: Do not commit API keys or private tokens.

---

## 🌐 Localization & Translations

Translations are managed via [Paraglide JS](https://inlang.com) in the `messages/` directory:
- The base source of truth is [`messages/en.json`](messages/en.json).
- To add a new locale, create `messages/<locale>.json` and register the locale in `project.inlang/settings.json`.

---

## 📄 Academic License

VertX is open-source software licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See the [LICENSE](LICENSE) file for complete terms.
