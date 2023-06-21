<script>
	//** @type {import('-/$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>News Reader</title>
</svelte:head>
<div class="container mx-auto">
	{#each data.news as newsItem}
		<a href="{newsItem.link}">
		<div class="card card-hover variant-soft-surface m-2">
			<header>
			{#if newsItem.media}
				<img alt="{newsItem.title}" src="{newsItem.media.url}" class="card-header-img" />
			{/if}
			</header>
			<section class="p-4">
				<h4 class="h4">{newsItem.title}</h4>

			</section>
			<footer class="card-footer">
				<hr />
				<h6 class="h6">
					{newsItem.feed} -
					{#if newsItem.feed !== 'hn'}
						{newsItem.creator}
					{:else}
						{new URL(newsItem.link).hostname}
					{/if}
				</h6>
			</footer>
		</div>
		</a>
	{/each}
	<dl class="list-dl">
		{#each data.news as newsItem}
			<hr />
			<div>
				<a href="{newsItem.link}">
				<span class="flex-auto">
					<dt class="font-extrabold" style="white-space: normal">{newsItem.title}</dt>
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
