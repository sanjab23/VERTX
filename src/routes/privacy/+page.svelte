<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { link, sanitize } from "$lib/store/index.svelte";
	import { ShieldCheckIcon, LockIcon, CpuIcon, GraduationCapIcon } from "lucide-svelte";
	import Panel from "$lib/components/visual/Panel.svelte";
	import { CONTACT_EMAIL } from "$lib/util/consts";
</script>

<div class="flex flex-col h-full items-center pb-20">
	<div class="text-center max-w-2xl mx-auto mb-8 px-4">
		<div class="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold tracking-wide uppercase">
			<span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
			Academic Privacy Architecture • 2026–2027
		</div>
		<h1 class="text-3xl md:text-5xl font-display font-bold tracking-tight mb-3">
			{m["privacy.title"]()}
		</h1>
		<p class="text-muted text-base md:text-lg">
			VertX operates under a strict Zero-Knowledge, 100% Client-Side WebAssembly execution architecture.
		</p>
	</div>

	<div class="w-full max-w-4xl flex flex-col gap-6 px-4 md:px-0">
		<Panel class="p-6 md:p-8 rounded-2.5xl flex flex-col gap-6">
			<div>
				<h2 class="text-xl md:text-2xl font-bold font-display mb-2">{m["privacy.summary.title"]()}</h2>
				<p class="text-foreground/90 leading-relaxed text-sm md:text-base">
					{m["privacy.summary.description"]()}
				</p>
			</div>

			<hr class="border-separator" />

			<div>
				<h2 class="text-xl font-bold mb-2">{m["privacy.conversions.title"]()}</h2>
				<p class="text-muted leading-relaxed text-sm md:text-base">
					{m["privacy.conversions.description"]()}
				</p>
			</div>

			<hr class="border-separator" />

			<div>
				<h2 class="text-xl font-bold mb-2">{m["privacy.donations.title"]()}</h2>
				<p class="text-muted leading-relaxed text-sm md:text-base">
					{m["privacy.donations.description"]()}
				</p>
			</div>

			<hr class="border-separator" />

			<div>
				<h2 class="text-xl font-bold mb-2">{m["privacy.conversion_errors.title"]()}</h2>
				<p class="text-muted leading-relaxed text-sm md:text-base mb-2">
					{m["privacy.conversion_errors.description"]()}
				</p>
				<ul class="list-disc list-inside text-sm text-muted space-y-1 mb-2">
					<li>{m["privacy.conversion_errors.list_job_id"]()}</li>
					<li>{m["privacy.conversion_errors.list_format_from"]()}</li>
					<li>{m["privacy.conversion_errors.list_format_to"]()}</li>
					<li>{m["privacy.conversion_errors.list_stderr"]()}</li>
				</ul>
				<p class="text-xs text-muted/80">{m["privacy.conversion_errors.footer"]()}</p>
			</div>

			<hr class="border-separator" />

			<div>
				<h2 class="text-xl font-bold mb-2">{m["privacy.analytics.title"]()}</h2>
				<p class="text-muted leading-relaxed text-sm md:text-base">
					{@html sanitize(
						link(
							["settings_link"],
							m["privacy.analytics.description"](),
							["/settings"],
							[false],
						),
					)}
				</p>
			</div>

			<hr class="border-separator" />

			<div>
				<h2 class="text-xl font-bold mb-2">{m["privacy.local_storage.title"]()}</h2>
				<p class="text-muted leading-relaxed text-sm md:text-base">
					{m["privacy.local_storage.description"]()}
				</p>
			</div>

			<hr class="border-separator" />

			<div class="bg-panel-highlight/40 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h3 class="font-bold text-base md:text-lg mb-1">{m["privacy.contact.title"]()}</h3>
					<p class="text-sm text-muted">
						{m["privacy.contact.description"]()}
					</p>
				</div>
				<a
					href="mailto:{CONTACT_EMAIL}"
					class="btn highlight px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap"
				>
					Contact Jagan
				</a>
			</div>

			<p class="text-xs text-muted text-center pt-2">{m["privacy.last_updated"]()}</p>
		</Panel>
	</div>
</div>
