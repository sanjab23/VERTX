<script lang="ts">
	import ConversionPanel from "$lib/components/functional/ConversionPanel.svelte";
	import FormatDropdown from "$lib/components/functional/FormatDropdown.svelte";
	import Uploader from "$lib/components/functional/Uploader.svelte";
	import Panel from "$lib/components/visual/Panel.svelte";
	import ProgressBar from "$lib/components/visual/ProgressBar.svelte";
	import Tooltip from "$lib/components/visual/Tooltip.svelte";
	import { categories, converters } from "$lib/converters";
	import {
		effects,
		files,
		gradientColor,
		showGradient,
		vertdLoaded,
		dropdownStates,
	} from "$lib/store/index.svelte";
	import { VertFile } from "$lib/types";
	import {
		AudioLines,
		BookText,
		CheckCircle2,
		Cpu,
		DownloadIcon,
		FileMusicIcon,
		FileQuestionIcon,
		FileVideo2,
		FilmIcon,
		HardDrive,
		ImageIcon,
		ImageOffIcon,
		Layers,
		RotateCwIcon,
		UploadCloud,
		XIcon,
	} from "lucide-svelte";
	import { m } from "$lib/paraglide/messages";
	import { Settings } from "$lib/sections/settings/index.svelte";
	import { MAX_ARRAY_BUFFER_SIZE } from "$lib/store/index.svelte";
	import { GB } from "$lib/util/consts";
	import { log } from "$lib/util/logger";
	import { swManager } from "$lib/util/sw";

	let processedFileIds = $state(new Set<string>());

	const totalQueueBytes = $derived(
		files.files.reduce((acc, f) => acc + (f.file?.size || 0), 0),
	);
	const convertedCount = $derived(
		files.files.filter((f) => f.result).length,
	);

	$effect(() => {
		if (!Settings.instance.settings || files.files.length === 0) return;

		files.files.forEach((file) => {
			const settings = Settings.instance.settings;
			if (processedFileIds.has(file.id)) return;

			const converter = file.findConverter();
			if (!converter) return;

			let category: string | undefined;
			const isImage = converter.name === "imagemagick";
			const isAudio = converter.name === "ffmpeg";
			const isVideo = converter.name === "vertd";
			const isDocument = converter.name === "pandoc";

			if (isImage) category = "image";
			else if (isAudio) category = "audio";
			else if (isVideo) category = "video";
			else if (isDocument) category = "doc";
			if (!category) return;

			let targetFormat: string | undefined;

			// restore saved format (if navigated back to page for example)
			const savedFormat = $dropdownStates[file.name];
			if (
				savedFormat &&
				savedFormat !== file.from &&
				categories[category]?.formats.includes(savedFormat)
			) {
				targetFormat = savedFormat;
			} else if (settings.useDefaultFormat) {
				// else use default format if enabled
				let defaultFormat: string | undefined;
				const df = settings.defaultFormat;
				if (category === "image") defaultFormat = df.image;
				else if (category === "audio") defaultFormat = df.audio;
				else if (category === "video") defaultFormat = df.video;
				else if (category === "doc") defaultFormat = df.document;

				if (
					defaultFormat &&
					defaultFormat !== file.from &&
					categories[category]?.formats.includes(defaultFormat)
				) {
					targetFormat = defaultFormat;
				}
			}

			// or use first available format (or if default format is same as input)
			if (!targetFormat) {
				const firstDiff = categories[category]?.formats.find(
					(f) => f !== file.from,
				);
				targetFormat =
					firstDiff || categories[category]?.formats[0] || "";
			}

			file.to = targetFormat;
			processedFileIds.add(file.id);
		});
	});

	const handleSelect = (option: string, file: VertFile) => {
		file.result = null;
	};

	$effect(() => {
		// Set gradient color depending on the file types
		let type = "";
		if (files.files.length) {
			const converters = files.files.map(
				(file) => file.findConverter()?.name,
			);
			const uniqueTypes = new Set(converters);

			if (uniqueTypes.size === 1) {
				const onlyType = converters[0];
				if (onlyType === "imagemagick") type = "blue";
				else if (onlyType === "ffmpeg") type = "purple";
				else if (onlyType === "vertd") type = "red";
				else if (onlyType === "pandoc") type = "green";
			}
		}

		if (files.files.length === 0 || !type) {
			showGradient.set(false);
		} else showGradient.set(true);

		gradientColor.set(type);
	});
</script>

{#snippet fileItem(file: VertFile, index: number)}
	{@const currentConverter = file.findConverter()}
	{@const isImage = currentConverter?.name === "imagemagick"}
	{@const isAudio = currentConverter?.name === "ffmpeg"}
	{@const isVideo = currentConverter?.name === "vertd"}
	{@const isDocument = currentConverter?.name === "pandoc"}
	<Panel class="p-5 flex flex-col min-w-0 gap-4 relative border border-separator w-full">
		<div class="flex-shrink-0 h-8 w-full flex items-center justify-between gap-2">
			<div class="flex items-center gap-2 min-w-0 flex-grow">
				{#if !converters.length}
					<FileQuestionIcon size="20" class="flex-shrink-0 text-muted" />
				{:else if isAudio}
					<AudioLines size="20" class="flex-shrink-0 text-accent-purple" />
				{:else if isVideo}
					<FilmIcon size="20" class="flex-shrink-0 text-accent-red" />
				{:else if isDocument}
					<BookText size="20" class="flex-shrink-0 text-accent-green" />
				{:else}
					<ImageIcon size="20" class="flex-shrink-0 text-accent-blue" />
				{/if}

				<div class="flex items-center gap-2 overflow-hidden flex-grow">
					{#if file.processing}
						<div class="w-full">
							<ProgressBar
								min={0}
								max={100}
								progress={currentConverter?.reportsProgress || file.isZip()
									? file.progress
									: null}
							/>
						</div>
					{:else}
						<h2
							class="text-base font-medium font-body overflow-hidden text-ellipsis whitespace-nowrap"
							title={file.name}
						>
							{file.name}
						</h2>
						{#if file.file}
							<span class="text-[11px] font-mono px-2 py-0.5 rounded-full bg-panel-alt text-muted flex-shrink-0">
								{swManager.formatSize(file.file.size)}
							</span>
						{/if}
					{/if}
				</div>
			</div>

			<button
				class="flex-shrink-0 w-8 h-8 rounded-full hover:bg-panel-alt flex items-center justify-center transition-colors"
				onclick={async () => {
					await file.cancel();
					files.files = files.files.filter((_, i) => i !== index);
				}}
				title="Remove file"
			>
				<XIcon size="18" class="text-muted hover:text-foreground" />
			</button>
		</div>
		{#if !currentConverter}
			{#if file.name.startsWith("vertd")}
				<div
					class="h-full flex flex-col text-center justify-center text-failure"
				>
					<p class="font-body font-bold">
						{m["convert.errors.cant_convert"]()}
					</p>
					<p class="font-normal">
						{m["convert.errors.vertd_server"]()}
					</p>
				</div>
			{:else}
				<div
					class="h-full flex flex-col text-center justify-center text-failure"
				>
					<p class="font-body font-bold">
						{m["convert.errors.cant_convert"]()}
					</p>
					<p class="font-normal">
						{m["convert.errors.unsupported_format"]()}
					</p>
				</div>
			{/if}
		{:else}
			{@const formatInfo = currentConverter.supportedFormats.find(
				(f) => f.name === file.from,
			)}
			{@const isLarge = file.isLarge()}
			{#if formatInfo && !formatInfo.fromSupported}
				<div
					class="h-full flex flex-col text-center justify-center text-failure"
				>
					<p class="font-body font-bold">
						{m["convert.errors.cant_convert"]()}
					</p>
					<p class="font-normal">
						{m["convert.errors.format_output_only"]()}
					</p>
				</div>
			{:else if isLarge && !file.supportsStreaming()}
				<div
					class="h-full flex flex-col text-center justify-center text-failure"
				>
					<p class="font-body font-bold">
						{m["convert.errors.cant_convert"]()}
					</p>
					<p class="font-normal">
						{m["workers.errors.file_too_large"]({
							limit: (MAX_ARRAY_BUFFER_SIZE / GB).toFixed(2),
						})}
					</p>
				</div>
			{:else if currentConverter.status === "downloading"}
				<div
					class="h-full flex flex-col text-center justify-center text-failure"
				>
					<p class="font-body font-bold">
						{m["convert.errors.cant_convert"]()}
					</p>
					<p class="font-normal">
						{m["convert.errors.worker_downloading"]({
							type: isAudio
								? m["convert.errors.audio"]()
								: isVideo
									? "Video"
									: isDocument
										? m["convert.errors.doc"]()
										: m["convert.errors.image"](),
						})}
					</p>
				</div>
			{:else if currentConverter.status === "error"}
				<div
					class="h-full flex flex-col text-center justify-center text-failure"
				>
					<p class="font-body font-bold">
						{m["convert.errors.cant_convert"]()}
					</p>
					<p class="font-normal">
						{m["convert.errors.worker_error"]({
							type: isAudio
								? m["convert.errors.audio"]()
								: isVideo
									? "Video"
									: isDocument
										? m["convert.errors.doc"]()
										: m["convert.errors.image"](),
						})}
					</p>
				</div>
			{:else if currentConverter.status === "not-ready"}
				<div
					class="h-full flex flex-col text-center justify-center text-failure"
				>
					<p class="font-body font-bold">
						{m["convert.errors.cant_convert"]()}
					</p>
					<p class="font-normal">
						{m["convert.errors.worker_timeout"]({
							type: isAudio
								? m["convert.errors.audio"]()
								: isVideo
									? "Video"
									: isDocument
										? m["convert.errors.doc"]()
										: m["convert.errors.image"](),
						})}
					</p>
				</div>
			{:else if isVideo && !$vertdLoaded && !isAudio && !isImage && !isDocument}
				<div
					class="h-full flex flex-col text-center justify-center text-failure"
				>
					<p class="font-body font-bold">
						{m["convert.errors.cant_convert"]()}
					</p>
					<p class="font-normal">
						{m["convert.errors.vertd_not_found"]()}
					</p>
				</div>
			{:else}
			{:else}
				<div class="flex flex-col sm:flex-row items-center gap-4 w-full pt-1">
					<!-- Media Preview Box -->
					<div class="w-full sm:w-1/2 h-36 rounded-xl overflow-hidden relative flex-shrink-0 border border-separator bg-panel-alt flex items-center justify-center">
						{#if file.blobUrl}
							<img
								class="object-cover w-full h-full"
								src={file.blobUrl}
								alt={file.name}
							/>
						{:else}
							<div
								class="w-full h-full flex flex-col items-center justify-center gap-1.5 text-black"
								style="background: var({isAudio
									? '--bg-gradient-purple-alt'
									: isVideo
										? '--bg-gradient-red-alt'
										: isDocument
											? '--bg-gradient-green-alt'
											: '--bg-gradient-blue-alt'})"
							>
								{#if isAudio}
									<FileMusicIcon size="42" />
									<span class="text-xs font-mono font-medium uppercase tracking-wider opacity-80">{file.from} audio</span>
								{:else if isVideo}
									<FileVideo2 size="42" />
									<span class="text-xs font-mono font-medium uppercase tracking-wider opacity-80">{file.from} video</span>
								{:else if isDocument}
									<BookText size="42" />
									<span class="text-xs font-mono font-medium uppercase tracking-wider opacity-80">{file.from} doc</span>
								{:else}
									<ImageOffIcon size="42" />
									<span class="text-xs font-mono font-medium uppercase tracking-wider opacity-80">{file.from} file</span>
								{/if}
							</div>
						{/if}

						{#if file.result}
							<div class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[11px] font-medium flex items-center gap-1 shadow-sm backdrop-blur-sm">
								<CheckCircle2 size="12" />
								<span>Ready</span>
							</div>
						{/if}
					</div>

					<!-- Target Format & Action Controls -->
					<div class="w-full sm:w-1/2 flex flex-col items-center justify-center gap-3">
						<div class="w-full max-w-[170px]">
							<FormatDropdown
								{categories}
								from={file.from}
								bind:selected={file.to}
								onselect={(option) =>
									handleSelect(option, file)}
								{file}
							/>
						</div>
						<div class="flex items-center gap-2 w-full pt-1">
							<button
								class="btn {$effects
									? ''
									: '!scale-100'} flex-1 h-11 px-3 rounded-xl font-semibold text-xs md:text-sm text-black flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-[1.02] {isAudio
									? 'bg-accent-purple'
									: isVideo
										? 'bg-accent-red'
										: isDocument
											? 'bg-accent-green'
											: 'bg-accent-blue'}"
								disabled={file.processing || (currentConverter && currentConverter.status === 'downloading')}
								onclick={() => file.convert()}
								title="Convert this file"
							>
								<RotateCwIcon size="16" class={file.processing ? "animate-spin" : ""} />
								<span>{file.processing ? "Converting..." : "Convert"}</span>
							</button>

							<button
								class="btn {$effects
									? ''
									: '!scale-100'} flex-1 h-11 px-3 rounded-xl font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-sm bg-panel-alt border border-separator hover:border-accent hover:scale-[1.02]"
								onclick={() => file.download()}
								disabled={!file.result}
								title="Download converted file"
							>
								<DownloadIcon size="16" class={file.result ? "text-emerald-500" : "text-muted"} />
								<span class={file.result ? "text-foreground font-bold" : "text-muted"}>Download</span>
							</button>
						</div>
					</div>
				</div>
			{/if}
		{/if}
	</Panel>
{/snippet}

<div class="flex flex-col justify-center items-center gap-6 -mt-4 px-4 md:p-0 max-w-5xl mx-auto w-full">
	<div class="w-full">
		<ConversionPanel />
	</div>

	<!-- Live Queue Telemetry Ribbon (Only when files are queued) -->
	{#if files.files.length > 0}
		<div class="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
			<Panel class="p-3.5 flex items-center gap-3 border border-separator bg-panel/80 backdrop-blur-sm">
				<div class="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
					<Layers size="18" />
				</div>
				<div class="min-w-0">
					<div class="text-[11px] uppercase tracking-wider text-muted font-mono font-medium">Queue Batch</div>
					<div class="text-sm font-semibold truncate">{files.files.length} {files.files.length === 1 ? 'file' : 'files'}</div>
				</div>
			</Panel>
			<Panel class="p-3.5 flex items-center gap-3 border border-separator bg-panel/80 backdrop-blur-sm">
				<div class="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
					<HardDrive size="18" />
				</div>
				<div class="min-w-0">
					<div class="text-[11px] uppercase tracking-wider text-muted font-mono font-medium">Buffer Size</div>
					<div class="text-sm font-semibold truncate">{swManager.formatSize(totalQueueBytes)}</div>
				</div>
			</Panel>
			<Panel class="p-3.5 flex items-center gap-3 border border-separator bg-panel/80 backdrop-blur-sm">
				<div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
					<CheckCircle2 size="18" />
				</div>
				<div class="min-w-0">
					<div class="text-[11px] uppercase tracking-wider text-muted font-mono font-medium">Completed</div>
					<div class="text-sm font-semibold truncate">{convertedCount} / {files.files.length} ready</div>
				</div>
			</Panel>
			<Panel class="p-3.5 flex items-center gap-3 border border-separator bg-panel/80 backdrop-blur-sm">
				<div class="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
					<Cpu size="18" />
				</div>
				<div class="min-w-0">
					<div class="text-[11px] uppercase tracking-wider text-muted font-mono font-medium">Engine Mode</div>
					<div class="text-sm font-semibold truncate">Wasm Client-Side</div>
				</div>
			</Panel>
		</div>
	{/if}

	<!-- File Grid: Flexible cards instead of rigid auto-rows-[240px] -->
	<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each files.files as file, i (file.id)}
			{#if files.files.length >= 2 && i === 1}
				<div class="min-h-[220px]">
					<Uploader class="w-full h-full min-h-[220px]" />
				</div>
			{/if}
			<div class="min-h-[220px] flex">
				{@render fileItem(file, i)}
			</div>
			{#if files.files.length < 2}
				<div class="min-h-[220px]">
					<Uploader class="w-full h-full min-h-[220px]" />
				</div>
			{/if}
		{/each}
		{#if files.files.length === 0}
			<div class="col-span-1 md:col-span-2 min-h-[280px]">
				<Uploader class="w-full h-full min-h-[280px]" />
			</div>
		{/if}
	</div>
</div>
