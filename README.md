<div align="center">

# ⚡ VertX
### In-Browser Universal WebAssembly File Transcoder
**A 100% Client-Side, Zero-Cloud Media & Document Conversion Engine**

[![Academic Project](https://img.shields.io/badge/Project-Academic%20Engineering%20Capstone-blue.svg)](#-academic-project-credentials)
[![Institution](https://img.shields.io/badge/Institution-New%20Horizon%20College-orange.svg)](#-academic-project-credentials)
[![Svelte 5](https://img.shields.io/badge/Framework-Svelte%205%20Runes-FF3E00.svg)](https://svelte.dev)
[![Runtime](https://img.shields.io/badge/Runtime-Bun-f472b6.svg)](https://bun.sh)
[![Engine](https://img.shields.io/badge/Architecture-WebAssembly%20(Wasm)-654FF0.svg)](https://webassembly.org)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)

</div>

---

## 📌 Executive Summary

Traditional file conversion utilities require users to upload documents, audio tracks, and private media to remote cloud servers. This exposes sensitive personal and corporate data to interception, third-party logging, and persistent cloud storage vulnerabilities, while incurring significant upload and download network latency.

**VertX** fundamentally re-engineers file conversion by compiling industry-standard C/C++ transcoding libraries (**FFmpeg**, **ImageMagick**, and **Pandoc**) directly into portable **WebAssembly (Wasm)** binaries. Running inside dedicated browser Web Worker threads, VertX performs transcoding operations strictly within local transient RAM:

- 🛡️ **100% Data Privacy**: Files never leave your local machine or traverse external networks.
- ⚡ **Zero Network Latency**: Near-instant processing with no file upload or download waiting queues.
- 💰 **Zero Server Costs**: Completely serverless static architecture hosted at $0 cost.
- 📦 **250+ Format Matrix**: Universal support for images, vector graphics, audio, documents, and eBooks.

---

## 🏗️ System Architecture

VertX employs a multi-threaded Web Worker architecture to prevent UI thread blocking during intensive transcoding operations:

```
[ User Upload ] ➔ [ Dynamic MIME Detection ] ➔ [ Concurrency Queue (p-queue) ]
                                                        │
         ┌──────────────────────────────────────────────┼──────────────────────────────────────────────┐
         ▼                                              ▼                                              ▼
┌─────────────────────────────────┐   ┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│     Worker 1: ImageMagick       │   │       Worker 2: FFmpeg Wasm     │   │      Worker 3: Pandoc Wasm      │
│  - WebP, PNG, AVIF, SVG, JPEG   │   │   - MP3, WAV, FLAC, OGG, AAC    │   │  - PDF, DOCX, Markdown, EPUB    │
│  - In-Memory Virtual FS         │   │   - Audio Stream Extraction     │   │  - AST Document Processing      │
└─────────────────────────────────┘   └─────────────────────────────────┘   └─────────────────────────────────┘
                                                        │
                                                        ▼
                            [ In-Memory Blob Assembly & client-zip Archiving ]
```

---

## ⚡ Key Features

- **Live Queue Telemetry Ribbon**: Real-time tracking of active queue batches, client buffer allocation (MB/GB), completed conversions, and Wasm engine state.
- **1-Click Quick Format Presets**: Instant batch conversion to `⚡ WebP`, `🖼️ PNG`, `🎵 MP3`, or `📄 PDF` with a single click.
- **Single-Click Batch Download**: Automatically packages all completed files into a `.zip` archive client-side using `client-zip` without server overhead.
- **Offline / Air-Gapped Mode**: Fully operational without an active internet connection once initial Wasm binaries are cached.
- **Material 3 Expressive UI**: Blueprint dot-matrix background, adaptive light/dark mode, and responsive layout.

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh) (v1.0 or later recommended)

### Local Development
```bash
# Clone the repository
git clone https://github.com/sanjab23/VERTX.git
cd VERTX

# Install dependencies
bun install

# Start development server
bun run dev
```
Open `http://localhost:5173` in your browser.

### Production Build & Local Preview
```bash
# Build static production bundle
bun run build

# Preview static build locally
bun run preview
```
Visit `http://localhost:4173` to test the production build.

---

## 🎓 Academic Project Credentials

- **Project Title:** VertX — In-Browser Universal WebAssembly File Transcoder
- **Candidate:** **Jagan**
- **Degree Program:** Bachelor of Engineering in Computer Science & Engineering
- **Institution:** **New Horizon College**, Kasturi Nagar, Bangalore
- **Academic Year:** 2026–2027

---

## 📜 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See the [LICENSE](LICENSE) file for complete open-source license terms.
