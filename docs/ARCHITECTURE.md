# VertX System Architecture & Technical Specifications

> **Academic Engineering Project (2026–2027)**  
> **Candidate:** Jagan  
> **Department:** Department of Computer Science & Engineering  
> **Institution:** New Horizon College, Kasturi Nagar, Bangalore  

---

## 1. Executive Summary

**VertX** is an in-browser universal file transcoding platform engineered to eliminate the severe security vulnerabilities, cloud hosting costs, and privacy hazards inherent in conventional cloud-based converters. By compiling native C/C++ libraries into **WebAssembly (Wasm)** and isolating them within dedicated browser Web Workers, VertX achieves near-native conversion throughput with a **100% Zero-Cloud Client-Side Guarantee**.

---

## 2. High-Level Architectural Flowchart

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER (V8 / JavaScript Engine)         │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                 Presentation & UI Layer (Svelte 5)             │   │
│   │   - Reactive Runes ($state, $derived, $effect)                 │   │
│   │   - Live Queue Telemetry Ribbon (Buffer Allocation, Count)     │   │
│   │   - 1-Click Fast Presets (⚡ WebP, 🖼️ PNG, 🎵 MP3, 📄 PDF)       │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │ (Structured Clone / ArrayBuffer)   │
│                                   ▼                                    │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                   Transcoding Pipeline Manager                 │   │
│   │   - Dynamic File MIME Sniffing & Converter Routing             │   │
│   │   - Batch Concurrency Control (p-queue)                        │   │
│   └───────┬───────────────────────┼───────────────────────┬────────┘   │
│           │                       │                       │            │
│           ▼                       ▼                       ▼            │
│   ┌───────────────┐       ┌───────────────┐       ┌───────────────┐    │
│   │ Worker Thread │       │ Worker Thread │       │ Worker Thread │    │
│   │ (ImageMagick) │       │ (FFmpeg Wasm) │       │ (Pandoc Wasm) │    │
│   │               │       │               │       │               │    │
│   │ - magick.wasm │       │ - ffmpeg.wasm │       │ - pandoc.wasm │    │
│   │ - Virtual FS  │       │ - Virtual FS  │       │ - WASI Shim   │    │
│   └───────┬───────┘       └───────┬───────┘       └───────┬───────┘    │
│           │                       │                       │            │
│           └───────────────────────┼───────────────────────┘            │
│                                   ▼                                    │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                Output Buffer & Blob Assembly                   │   │
│   │   - client-zip Archive Bundler (Single-Click Batch Download)   │   │
│   │   - Local Object URL Revocation (Instant Memory Reclamation)   │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Core Engine Specifications

| Transcoding Subsystem | Underlying Engine | WASI / Execution Model | Supported Matrix |
| :--- | :--- | :--- | :--- |
| **Raster & Vector Images** | `@imagemagick/magick-wasm` | Wasm bytecode loaded into Web Worker | PNG, JPEG, WebP, AVIF, SVG, GIF, BMP, TIFF, ICO, PSD |
| **Audio Containers** | `@ffmpeg/ffmpeg` (`@0.12.10`) | Modular WASI runtime with virtual filesystem | MP3, WAV, FLAC, OGG, AAC, M4A, OPUS, AIFF, WMA |
| **Document Trees** | `pandoc.wasm` (`@bjorn3/browser_wasi_shim`) | AST parsing via Haskell-to-Wasm compiler | PDF, DOCX, Markdown, HTML, EPUB, LaTeX, RTF, TXT |
| **Local Video Daemon** *(Optional)* | `vertd` (Rust + FFmpeg) | Local loopback microservice (`localhost:24153`) | MP4, MKV, WebM, AVI, MOV (Hardware Accelerated) |

---

## 4. Key Engineering Innovations

### 4.1 Transient Memory Safety & Zero Leakage
- Uploaded files are streamed into `Uint8Array` memory buffers inside isolated Web Workers.
- Once transcoding finishes, output files are packaged via `client-zip` or converted into local `blob:` URLs.
- Immediately after download or cancellation, `URL.revokeObjectURL()` and worker termination release all buffer memory back to the operating system.

### 4.2 Single-Threaded Universal Static Compatibility
- Uses `@ffmpeg/core@0.12.10` single-threaded edition, bypassing the strict `SharedArrayBuffer` requirements (`Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy`).
- Allows VertX to run seamlessly on **GitHub Pages**, **Vercel**, **Netlify**, or simple static web servers with zero CORS configuration hurdles.

### 4.3 Svelte 5 Fine-Grained Reactivity
- State management leverages Svelte 5 Runes (`$state`, `$derived`, `$props`) to achieve surgical DOM updates without virtual DOM diffing overhead.
- Live Telemetry Ribbon calculates batch queue size, buffer utilization, and transcoding progress in real-time.

---

## 5. Academic Verification & Project Details

- **Title:** VertX — In-Browser Universal WebAssembly File Transcoder
- **Candidate:** Jagan
- **Degree:** Bachelor of Engineering in Computer Science & Engineering
- **Institution:** New Horizon College, Kasturi Nagar, Bangalore
- **Academic Year:** 2026–2027
- **License:** GNU Affero General Public License v3.0 (AGPL-3.0)
