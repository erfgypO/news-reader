<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	//** @type {import('-/$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>News Reader</title>
</svelte:head>
<div>
	<dl class="list-dl">
		{#each data.news as newsItem}
			<div>
				<a href="{newsItem.link}" rel="prefetch">
				<span class="flex-auto">
					<dt class="font-extrabold">{newsItem.title}</dt>
					<dd>{newsItem.feed} -
						{#if newsItem.feed !== 'hn'}
							{newsItem.creator}
						{:else}
							{new URL(newsItem.link).hostname}
						{/if}
					</dd>
				</span>
				</a>
			</div>
		{/each}
	</dl>
</div>
