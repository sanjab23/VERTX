<script lang="ts">
	let { iconOnly = false, class: className = "" } = $props();
</script>

{#if iconOnly}
	<svg
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="w-full h-full {className}"
	>
		<path
			d="M4 6L14 27C14.5 28 15.5 28 16 27L26 6H20.5L15 19L9.5 6H4Z"
			fill="currentColor"
		/>
		<path
			d="M18 13L27 28H22L14.5 16L18 13Z"
			fill="currentColor"
			opacity="0.85"
		/>
	</svg>
{:else}
	<svg
		viewBox="0 0 128 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="w-full h-full {className}"
	>
		<g fill="currentColor">
			<path
				d="M4 6L14 27C14.5 28 15.5 28 16 27L26 6H20.5L15 19L9.5 6H4Z"
			/>
			<path
				d="M18 13L27 28H22L14.5 16L18 13Z"
				opacity="0.85"
			/>
			<text
				x="34"
				y="23"
				font-family="system-ui, -apple-system, sans-serif"
				font-size="22"
				font-weight="800"
				letter-spacing="-0.5px"
			>Vert<tspan font-weight="900">X</tspan></text>
		</g>
	</svg>
{/if}

