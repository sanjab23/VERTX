<script lang="ts">
	import { onMount } from "svelte";
	import { goto, beforeNavigate, afterNavigate } from "$app/navigation";
	import { base } from "$app/paths";

	import { PUB_PLAUSIBLE_URL, PUB_HOSTNAME } from "$env/static/public";
	import { DISABLE_ALL_EXTERNAL_REQUESTS, VERT_NAME } from "$lib/util/consts.js";
	import * as Layout from "$lib/components/layout";
	import * as Navbar from "$lib/components/layout/Navbar";
	import featuredImage from "$lib/assets/VERT_Feature.webp";
	import { Settings } from "$lib/sections/settings/index.svelte";
	import {
		files,
		isMobile,
		effects,
		theme,
		dropping,
		vertdLoaded,
		locale,
		updateLocale,
	} from "$lib/store/index.svelte";
	import "$lib/css/app.scss";
	import { browser } from "$app/environment";
	import { initStores as initAnimStores } from "$lib/util/animation.js";
	import { VertdInstance } from "$lib/sections/settings/vertdSettings.svelte.js";
	import { ToastManager } from "$lib/util/toast.svelte.js";
	import { m } from "$lib/paraglide/messages.js";
	import { log } from "$lib/util/logger.js";

	let { children } = $props();
	let enablePlausible = $state(false);
	let isAprilFools = $state(false);

	let scrollPositions = new Map<string, number>();

	beforeNavigate((nav) => {
		if (!nav.from || !$isMobile) return;
		scrollPositions.set(nav.from.url.pathname, window.scrollY);
	});

	afterNavigate((nav) => {
		if (!$isMobile) return;
		const scrollY = nav.to
			? scrollPositions.get(nav.to.url.pathname) || 0
			: 0;
		window.scrollTo(0, scrollY);
	});

	const dropFiles = (e: DragEvent) => {
		e.preventDefault();
		dropping.set(false);
		const oldLength = files.files.length;
		files.add(e.dataTransfer?.files);
		if (oldLength !== files.files.length) goto("/convert");
	};

	const handleDrag = (e: DragEvent, drag: boolean) => {
		e.preventDefault();
		dropping.set(drag);
	};

	const handlePaste = (e: ClipboardEvent) => {
		const clipboardData = e.clipboardData;
		if (!clipboardData || !clipboardData.files.length) return;
		e.preventDefault();
		const oldLength = files.files.length;
		files.add(clipboardData.files);
		if (oldLength !== files.files.length) goto("/convert");
	};

	onMount(() => {
		const now = new Date();
		isAprilFools = now.getDate() === 1 && now.getMonth() === 3;

		initAnimStores();

		const handleResize = () => {
			isMobile.set(window.innerWidth <= 768);
		};

		isMobile.set(window.innerWidth <= 768); // initial page load
		window.addEventListener("resize", handleResize); // handle window resize
		window.addEventListener("paste", handlePaste);

		effects.set(localStorage.getItem("effects") !== "false"); // defaults to true if not set
		theme.set(
			(localStorage.getItem("theme") as "light" | "dark") || "light",
		);
		const storedLocale = localStorage.getItem("locale");
		if (storedLocale) updateLocale(storedLocale);

		Settings.instance.load();

		if (!DISABLE_ALL_EXTERNAL_REQUESTS) {
			VertdInstance.instance
				.url()
				.then((u) => fetch(`${u}/api/version`))
				.then((res) => {
					if (res.ok) $vertdLoaded = true;
				});
		}

		// detect if insecure context
		if (!window.isSecureContext) {
			log(["layout"], "Insecure context (HTTP) detected, some features may not work as expected -- you may want to enable \"PUB_DISABLE_FAILURE_BLOCKS\" on local deployments.");
			ToastManager.add({
				type: "warning",
				message: m["toast.insecure_context"](),
				disappearing: false,
			});
		}

		return () => {
			window.removeEventListener("paste", handlePaste);
			window.removeEventListener("resize", handleResize);
		};
	});

	$effect(() => {
		enablePlausible =
			!!PUB_PLAUSIBLE_URL &&
			Settings.instance.settings.plausible &&
			!DISABLE_ALL_EXTERNAL_REQUESTS;
		if (!enablePlausible && browser) {
			// reset pushState on opt-out so that plausible stops firing events on page navigation
			history.pushState = History.prototype.pushState;
		}
	});
</script>

<svelte:head>
	<title>{VERT_NAME}</title>
	<meta name="theme-color" content="#2563eb" />
	<meta
		name="title"
		content="{VERT_NAME} — 100% Client-Side WebAssembly File Converter"
	/>
	<meta
		name="description"
		content="VertX converts image, video, audio, and document files locally in transient browser memory with WebAssembly. Engineered by Jagan, New Horizon College, Kasturi Nagar."
	/>
	<meta property="og:url" content="https://github.com/sanjab23/VERTX" />
	<meta property="og:type" content="website" />
	<meta
		property="og:title"
		content="{VERT_NAME} — 100% Client-Side WebAssembly File Converter"
	/>
	<meta
		property="og:description"
		content="VertX converts image, video, audio, and document files locally in transient browser memory with WebAssembly. Engineered by Jagan, New Horizon College, Kasturi Nagar."
	/>
	<meta property="og:image" content={featuredImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="github.com" />
	<meta property="twitter:url" content="https://github.com/sanjab23/VERTX" />
	<meta
		property="twitter:title"
		content="{VERT_NAME} — 100% Client-Side WebAssembly File Converter"
	/>
	<meta
		property="twitter:description"
		content="VertX converts image, video, audio, and document files locally in transient browser memory with WebAssembly. Engineered by Jagan, New Horizon College, Kasturi Nagar."
	/>
	<meta property="twitter:image" content={featuredImage} />
	<link rel="manifest" href="{base}/manifest.json" />
	<link rel="canonical" href="https://github.com/sanjab23/VERTX" />
	{#if enablePlausible}
		<script
			defer
			data-domain={PUB_HOSTNAME || "localhost"}
			src="{PUB_PLAUSIBLE_URL}/js/script.js"
		></script>
	{/if}
	{#if isAprilFools}
		<style>
			* {
				font-family: "Comic Sans MS", "Comic Sans", cursive !important;
			}
		</style>
	{/if}
</svelte:head>

<!-- FIXME: if user resizes between desktop/mobile, highlight of page disappears (only shows on original size) -->
{#key $locale}
	<div
		class="flex flex-col min-h-screen h-full w-full overflow-x-hidden md:pl-24 lg:pl-64 transition-all duration-300"
		ondrop={dropFiles}
		ondragenter={(e) => handleDrag(e, true)}
		ondragover={(e) => handleDrag(e, true)}
		ondragleave={(e) => handleDrag(e, false)}
		role="region"
	>
		<Layout.UploadRegion />

		<div>
			<Layout.MobileLogo />
			<Navbar.Desktop />
		</div>

		<!-- 
		SvelteKit throws the following warning when developing - safe to ignore as we render the children in this component:
		`<slot />` or `{@render ...}` tag missing — inner content will not be rendered
		-->
		<Layout.PageContent {children} />

		<Layout.Toasts />
		<Layout.Dialogs />

		<div>
			<Layout.Footer />
			<Navbar.Mobile />
		</div>
	</div>
{/key}

<!-- Gradients placed here to prevent it overlapping in transitions -->
<Layout.Gradients />
