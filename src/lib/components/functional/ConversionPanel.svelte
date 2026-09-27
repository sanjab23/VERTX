<script lang="ts">
	import { effects, files, isMobile } from "$lib/store/index.svelte";
	import { FolderArchiveIcon, RefreshCw, Trash2Icon, ZapIcon } from "lucide-svelte";
	import Panel from "../visual/Panel.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Tooltip from "../visual/Tooltip.svelte";
	import ProgressBar from "../visual/ProgressBar.svelte";
	import FormatDropdown from "./FormatDropdown.svelte";
	import { categories } from "$lib/converters";
	import { m } from "$lib/paraglide/messages";

	const length = $derived(files.files.length);
	const progress = $derived(files.files.filter((f) => f.result).length);

	const presets = [
		{ label: "⚡ WebP", ext: ".webp", title: "Convert images to WebP" },
		{ label: "🖼️ PNG", ext: ".png", title: "Convert images to PNG" },
		{ label: "🎵 MP3", ext: ".mp3", title: "Convert audio/video to MP3" },
		{ label: "📄 PDF", ext: ".pdf", title: "Convert documents to PDF" },
	];

	function applyPreset(targetExt: string) {
		let appliedCount = 0;
		files.files.forEach((f) => {
			const converters = f.findConverters([targetExt]);
			if (converters && converters.length > 0) {
				f.to = targetExt;
				f.result = null;
				appliedCount++;
			}
		});
	}
</script>

<Panel class="flex flex-col gap-4">
	<div
		class="w-full h-auto flex items-center justify-between flex-col md:flex-row gap-4"
	>
		<div
			class="flex items-center flex-col md:flex-row gap-2.5 max-md:w-full"
		>
			<button
				onclick={() => files.convertAll()}
				class="btn {$effects
					? ''
					: '!scale-100'} highlight flex gap-2.5 max-md:w-full md:max-w-[15.5rem] items-center"
				disabled={!files.ready || files.files.length === 0}
			>
				<RefreshCw size="20" />
				<p>{m["convert.panel.convert_all"]()}</p>
				{#if files.files.length > 0}
					<span class="ml-1 px-2 py-0.5 rounded-full text-xs bg-white/20 font-bold">
						{files.files.length}
					</span>
				{/if}
			</button>
			<button
				class="btn {$effects
					? ''
					: '!scale-100'} flex gap-2.5 max-md:w-full md:max-w-[15.5rem] items-center"
				disabled={!files.ready || progress === 0}
				onclick={() => files.downloadAll()}
			>
				<FolderArchiveIcon size="20" />
				<p>{m["convert.panel.download_all"]()}</p>
				{#if progress > 0}
					<span class="ml-1 px-2 py-0.5 rounded-full text-xs bg-accent text-on-accent font-bold">
						{progress}
					</span>
				{/if}
			</button>
			{#if $isMobile}
				<button
					class="btn p-3 {$effects
						? ''
						: '!scale-100'} flex gap-2 max-md:w-full"
					disabled={files.files.length === 0}
					onclick={() => (files.files = [])}
				>
					<Trash2Icon size="20" />
					<p>{m["convert.panel.remove_all"]()}</p>
				</button>
			{:else}
				<Tooltip
					text={m["convert.panel.remove_all"]()}
					position="right"
				>
					<button
						class="btn p-3 {$effects
							? ''
							: '!scale-100'} flex gap-2 max-md:w-full"
						disabled={files.files.length === 0}
						onclick={() => (files.files = [])}
					>
						<Trash2Icon size="20" />
					</button>
				</Tooltip>
			{/if}
		</div>

		<div class="w-full bg-separator h-0.5 flex md:hidden"></div>

		<div class="flex items-center gap-2">
			<p class="whitespace-nowrap text-sm font-medium text-muted">
				{m["convert.panel.set_all_to"]()}
			</p>
			<div class="w-44">
				{#if files.files.length > 0 && files.files.every((f) => f.converters.length) && files.files.every((f) => JSON.stringify(f.converters) === JSON.stringify(files.files[0].converters))}
					<FormatDropdown
						onselect={(r) =>
							files.files.forEach((f) => {
								f.to = r;
								f.result = null;
							})}
						{categories}
						dropdownSize={"large"}
					/>
				{:else}
					<Dropdown options={[m["convert.panel.na"]()]} disabled />
				{/if}
			</div>
		</div>
	</div>

	<!-- 1-Click Quick Batch Presets Row -->
	{#if files.files.length > 0}
		<div class="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-separator text-xs">
			<div class="flex items-center gap-2 flex-wrap">
				<span class="font-bold text-muted uppercase tracking-wider flex items-center gap-1 text-[11px]">
					<ZapIcon size="13" class="text-accent" />
					Quick Presets:
				</span>
				<div class="flex items-center gap-1.5 flex-wrap">
					{#each presets as preset}
						<button
							class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-panel-highlight/70 hover:bg-accent/15 hover:text-accent border border-separator transition-all cursor-pointer shadow-2xs"
							onclick={() => applyPreset(preset.ext)}
							title={preset.title}
						>
							{preset.label}
						</button>
					{/each}
				</div>
			</div>
			<div class="text-muted font-medium text-xs">
				Batch processing runs 100% in local memory
			</div>
		</div>
	{/if}

	{#if files.files.length > 0 && (files.processing || progress > 0)}
		<div class="w-full pt-1 flex gap-3 items-center">
			<div class="flex-shrink-0 font-medium text-xs text-muted">
				Progress: {progress}/{length}
			</div>
			<div class="flex-grow">
				<ProgressBar min={0} max={length} {progress} />
			</div>
		</div>
	{/if}
</Panel>
