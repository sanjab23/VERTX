# Video Conversion Architecture in VertX

This document outlines how video transcoding is handled in the **VertX** ecosystem.

---

## 🎯 Architecture Overview

Unlike images, audio, and documents—which execute **100% client-side** inside transient browser RAM using WebAssembly (ImageMagick, FFmpeg, and Pandoc)—large video files (e.g. 4K H.264/HEVC) present intense compute and memory constraints in browser sandboxes.

To address this without compromising user privacy, VertX offers a dual-mode video architecture:

### 1. In-Browser Audio Extraction
When extracting audio tracks from video files (e.g., MP4 ➔ MP3/WAV/AAC), VertX processes the container directly **in-browser via `@ffmpeg/ffmpeg` Wasm** without sending any video data to an external server.

### 2. Optional Local Hardware Acceleration (`vertd`)
For full video-to-video transcoding (e.g., AVI ➔ MP4, MKV ➔ WebM), VertX can communicate with a local Rust daemon (`vertd`) running on your machine:
- **Localhost Execution**: Runs as a lightweight local microservice on `http://localhost:24153`.
- **Hardware Acceleration**: Harnesses your local GPU (NVENC / QuickSync / VAAPI) for near-instant encoding.
- **Privacy Guaranteed**: Data never traverses the public internet; packets stay within the `127.0.0.1` loopback interface.

---

## 🔒 100% Standalone Mode (Air-Gapped / Zero External Calls)

If you are running VertX in an air-gapped environment or want to disable all external requests:

1. Open `.env` (or configure your hosting environment):
   ```env
   PUB_DISABLE_ALL_EXTERNAL_REQUESTS=true
   ```
2. When this flag is enabled, VertX operates exclusively with local WebAssembly engines (ImageMagick, client FFmpeg audio, and Pandoc), removing all external server dependencies.

---

## 🏫 Academic Context

- **Project:** VertX — In-Browser Universal WebAssembly File Transcoder
- **Author:** Jagan
- **Department:** Department of Computer Science & Engineering
- **Institution:** New Horizon College, Kasturi Nagar, Bangalore (Academic Year 2026–2027)
