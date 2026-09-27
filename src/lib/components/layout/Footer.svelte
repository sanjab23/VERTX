<script lang="ts">
	import { GITHUB_URL_VERT, DISCORD_URL } from "$lib/util/consts";
	import { m } from "$lib/paraglide/messages";

	const commitHash =
		__COMMIT_HASH__ && __COMMIT_HASH__ !== "unknown"
			? __COMMIT_HASH__
			: null;

	const year = new Date().getFullYear();

	// we can't use svelte snippets or a derived object to render the footer as it causes a full-page reload
	// ...for some reason. i have no idea, maybe it's to do with the {#key $locale} in +layout.svelte
</script>

<footer
	class="hidden md:block w-full h-14 border-t border-separator fixed bottom-0 mt-12 md:pl-24 lg:pl-64 transition-all duration-300"
>
	<div
		class="w-full h-full flex items-center justify-center text-muted gap-3 relative text-sm"
	>
		<p class="font-medium text-foreground">© 2026–2027 Jagan • New Horizon College, Kasturi Nagar</p>
		<p>•</p>
		<a
			class="hover:underline font-medium text-accent"
			href={GITHUB_URL_VERT}
			target="_blank"
		>
			GitHub Repository
		</a>
		<p>•</p>
		<span class="text-xs px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-semibold">
			⚡ WebAssembly Client-Side Engine
		</span>
		{#if commitHash}
			<p>•</p>
			<a
				class="hover:underline font-normal"
				href="{GITHUB_URL_VERT}/commit/{commitHash}"
				target="_blank"
			>
				{commitHash}
			</a>
		{/if}
	</div>

	<div
		class="absolute bottom-0 left-0 w-full h-24 -z-10 pointer-events-none"
		style="background: linear-gradient(to bottom, transparent, var(--bg) 100%)"
	></div>
</footer>
