<script lang="ts">
	import { page } from "$app/state";
	import { base } from "$app/paths";
	import { files, setTheme } from "$lib/store/index.svelte";
	import clsx from "clsx";
	import {
		InfoIcon,
		MoonIcon,
		RefreshCw,
		SettingsIcon,
		SunIcon,
		UploadIcon,
		type Icon as IconType,
	} from "lucide-svelte";
	import Panel from "../../visual/Panel.svelte";
	import Logo from "../../visual/svg/Logo.svelte";
	import Tooltip from "$lib/components/visual/Tooltip.svelte";
	import { m } from "$lib/paraglide/messages";

	const items = $derived<
		{
			name: string;
			url: string;
			activeMatch: (pathname: string) => boolean;
			icon: typeof IconType;
			badge?: number;
		}[]
	>([
		{
			name: m["navbar.upload"](),
			url: `${base}/`,
			activeMatch: (pathname) => pathname === `${base}/` || pathname === `${base}` || pathname === "/",
			icon: UploadIcon,
		},
		{
			name: m["navbar.convert"](),
			url: `${base}/convert/`,
			activeMatch: (pathname) =>
				pathname === `${base}/convert/` || pathname === `${base}/convert` || pathname === "/convert/" || pathname === "/convert",
			icon: RefreshCw,
			badge: files.files.length,
		},
		{
			name: m["navbar.settings"](),
			url: `${base}/settings/`,
			activeMatch: (pathname) => pathname.startsWith(`${base}/settings`) || pathname.startsWith("/settings"),
			icon: SettingsIcon,
		},
		{
			name: m["navbar.about"](),
			url: `${base}/about/`,
			activeMatch: (pathname) => pathname.startsWith(`${base}/about`) || pathname.startsWith("/about"),
			icon: InfoIcon,
		},
	]);
</script>

<aside class="hidden md:flex fixed left-5 top-5 bottom-5 z-50">
	<Panel class="w-18 lg:w-56 h-full flex flex-col justify-between items-center py-5 px-3 backdrop-blur-xl">
		<!-- Top: Brand & Logo -->
		<div class="w-full flex flex-col items-center">
			<a
				class="w-full bg-accent text-on-accent rounded-xl p-2.5 flex items-center justify-center lg:justify-start gap-2.5 mb-6 shadow-sm hover:scale-[1.02] transition-transform"
				href="{base}/"
			>
				<div class="h-6 w-6 flex-shrink-0 flex items-center justify-center">
					<Logo iconOnly={true} />
				</div>
				<div class="hidden lg:flex flex-col text-left leading-tight">
					<span class="font-display font-bold text-sm tracking-tight">VertX</span>
					<span class="text-[10px] opacity-80 font-medium">By Jagan</span>
				</div>
			</a>

			<!-- Nav Items -->
			<nav class="w-full flex flex-col gap-2">
				{#each items as item (item.url)}
					{@const Icon = item.icon}
					{@const isActive = item.activeMatch(page.url.pathname)}
					<Tooltip text={item.name} position="right">
						<a
							href={item.url}
							class={clsx(
								"w-full h-11 rounded-xl flex items-center justify-center lg:justify-start gap-3 px-3 transition-all duration-200 relative",
								{
									"bg-accent/15 text-accent font-semibold shadow-xs": isActive,
									"text-muted hover:bg-panel-highlight hover:text-foreground": !isActive,
								}
							)}
						>
							<div class="relative flex items-center justify-center">
								<Icon size="20" />
								{#if item.badge}
									<span class="absolute -top-1.5 -right-2 px-1.5 h-4 min-w-4 text-[10px] font-bold rounded-full bg-accent text-on-accent flex items-center justify-center">
										{item.badge}
									</span>
								{/if}
							</div>
							<span class="hidden lg:inline text-sm font-medium">
								{item.name}
							</span>
						</a>
					</Tooltip>
				{/each}
			</nav>
		</div>

		<!-- Bottom: Theme Toggle & Status -->
		<div class="w-full flex flex-col items-center gap-3 pt-4 border-t border-separator/30">
			<Tooltip text={m["navbar.toggle_theme"]()} position="right">
				<button
					onclick={() => {
						const isDark = document.documentElement.classList.contains("dark");
						setTheme(isDark ? "light" : "dark");
					}}
					class="w-full h-11 rounded-xl flex items-center justify-center lg:justify-start gap-3 px-3 text-muted hover:bg-panel-highlight hover:text-foreground transition-colors cursor-pointer"
					aria-label="Toggle Theme"
				>
					<SunIcon class="dynadark:hidden block" size="20" />
					<MoonIcon class="dynadark:block hidden" size="20" />
					<span class="hidden lg:inline text-sm font-medium">Theme</span>
				</button>
			</Tooltip>

			<div class="hidden lg:flex flex-col items-center text-center px-1">
				<span class="text-[10px] font-semibold text-accent tracking-wider uppercase">
					⚡ Wasm Engine
				</span>
			</div>
		</div>
	</Panel>
</aside>
