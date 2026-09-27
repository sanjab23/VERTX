<script lang="ts">
	import Panel from "$lib/components/visual/Panel.svelte";
	import {
		CpuIcon,
		GithubIcon,
		GraduationCapIcon,
		LayersIcon,
		ShieldCheckIcon,
		SparklesIcon,
		TerminalIcon,
	} from "lucide-svelte";
	import { GITHUB_URL_VERT } from "$lib/util/consts";
</script>

<div class="flex flex-col h-full items-center pb-24">
	<!-- Page Header -->
	<div class="text-center max-w-2xl mx-auto mb-8 px-4">
		<div class="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold tracking-wide uppercase">
			<span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
			Academic Engineering Project • 2026–2027
		</div>
		<h1 class="text-3xl md:text-5xl font-display font-bold tracking-tight mb-3">
			About VertX
		</h1>
		<p class="text-muted text-base md:text-lg">
			A cutting-edge, 100% client-side universal file conversion engine powered by WebAssembly shims.
		</p>
	</div>

	<!-- Main Content Grid -->
	<div class="w-full max-w-5xl flex flex-col gap-6 px-4 md:px-0">
		<!-- Core Concept & Mission Panel -->
		<Panel class="p-6 md:p-8 rounded-2.5xl flex flex-col gap-4">
			<div class="flex items-center gap-3">
				<div class="rounded-xl bg-accent text-on-accent p-3">
					<SparklesIcon size="24" />
				</div>
				<div>
					<h2 class="text-xl md:text-2xl font-bold font-display">Zero-Cloud Client-Side Philosophy</h2>
					<p class="text-muted text-sm">Eliminating server storage, security vulnerabilities, and network bottlenecks</p>
				</div>
			</div>
			<p class="text-foreground/90 leading-relaxed text-sm md:text-base">
				Traditional file conversion tools compromise user privacy by transmitting documents, media files, and sensitive records to remote cloud servers. 
				<strong>VertX</strong> fundamentally re-engineers this paradigm by leveraging <strong>WebAssembly (Wasm)</strong> to execute high-performance C and C++ libraries (such as FFmpeg and ImageMagick) directly within the user's browser. Files never leave local memory, achieving zero data leakage, zero cloud hosting costs, and near-instant processing latency.
			</p>
		</Panel>

		<!-- 4 Technical Highlights Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<Panel class="p-6 rounded-2.5xl flex flex-col gap-3 hover:border-accent/40 transition-colors">
				<div class="flex items-center gap-3">
					<div class="rounded-xl bg-accent-blue/15 text-accent-blue p-2.5">
						<CpuIcon size="22" />
					</div>
					<h3 class="font-bold text-lg">WebAssembly Core (Wasm)</h3>
				</div>
				<p class="text-muted text-sm leading-relaxed">
					Compiles native multi-threaded FFmpeg and ImageMagick binaries into portable WASI bytecode, running directly on client CPU threads via the browser's V8 runtime.
				</p>
			</Panel>

			<Panel class="p-6 rounded-2.5xl flex flex-col gap-3 hover:border-accent/40 transition-colors">
				<div class="flex items-center gap-3">
					<div class="rounded-xl bg-accent-green/15 text-accent-green p-2.5">
						<ShieldCheckIcon size="22" />
					</div>
					<h3 class="font-bold text-lg">100% Client-Side Privacy</h3>
				</div>
				<p class="text-muted text-sm leading-relaxed">
					Zero telemetry tracking, zero server uploads, and no external database storage. All transcoding operations occur strictly inside transient browser RAM.
				</p>
			</Panel>

			<Panel class="p-6 rounded-2.5xl flex flex-col gap-3 hover:border-accent/40 transition-colors">
				<div class="flex items-center gap-3">
					<div class="rounded-xl bg-accent-purple/15 text-accent-purple p-2.5">
						<LayersIcon size="22" />
					</div>
					<h3 class="font-bold text-lg">250+ Format Matrix</h3>
				</div>
				<p class="text-muted text-sm leading-relaxed">
					Comprehensive cross-format support spanning vector graphics, lossy/lossless audio formats, video streams, eBooks, Markdown, and tabular spreadsheets.
				</p>
			</Panel>

			<Panel class="p-6 rounded-2.5xl flex flex-col gap-3 hover:border-accent/40 transition-colors">
				<div class="flex items-center gap-3">
					<div class="rounded-xl bg-accent/15 text-accent p-2.5">
						<TerminalIcon size="22" />
					</div>
					<h3 class="font-bold text-lg">Modern Svelte 5 Stack</h3>
				</div>
				<p class="text-muted text-sm leading-relaxed">
					Built with Svelte 5 reactive Runes, SvelteKit, TypeScript, Vite, and Tailwind CSS, bundled and executed with the high-performance Bun runtime.
				</p>
			</Panel>
		</div>

		<!-- Project & Candidate Attribution Box -->
		<Panel class="p-6 md:p-8 rounded-2.5xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-panel-highlight/50">
			<div class="flex flex-col gap-1.5">
				<div class="flex items-center gap-2">
					<GraduationCapIcon class="text-accent" size="20" />
					<span class="text-xs font-bold text-accent uppercase tracking-wider">Candidate & Academic Project</span>
				</div>
				<h3 class="text-2xl font-bold font-display">Jagan</h3>
				<p class="text-muted text-sm">
					Department of Computer Science & Engineering<br>
					<strong>New Horizon College</strong>, Kasturi Nagar, Bangalore (Academic Year 2026–2027)
				</p>
			</div>

			<a
				href={GITHUB_URL_VERT}
				target="_blank"
				class="btn highlight gap-2.5 px-6 h-12 text-sm font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
			>
				<GithubIcon size="18" />
				<span>View Source Code</span>
			</a>
		</Panel>
	</div>
</div>
