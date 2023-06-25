<script>
	import { Accordion, AccordionItem, SlideToggle } from '@skeletonlabs/skeleton';
	import { visitedPages, hideVisitedPages } from "../stores.js";

	//** @type {import('-/$types').PageData} */
	export let data;

	let hnEnabled = true;
	let tcEnabled = true;
	let engadgetEnabled = true;

	$: news = data.news.filter((newsItem) => {
		if($hideVisitedPages && $visitedPages.includes(newsItem.guid)) {
			return false;
		}
		if (newsItem.feed === 'hn') {
			return hnEnabled;
		} else if (newsItem.feed === 'tc') {
			return tcEnabled;
		} else if (newsItem.feed === 'engadget') {
			return engadgetEnabled;
		}
		return true;
	});

	function onItemClick(item) {
		if(!$visitedPages.includes(item.guid)) {
			$visitedPages = [...$visitedPages, item.guid];
		}

		window.open(item.link, '_blank').focus();
	}
</script>

<svelte:head>
	<title>News Reader</title>
</svelte:head>
<div class="container mx-auto">
	<Accordion class="mt-2">
		<AccordionItem>
			<svelte:fragment slot="summary">Filter</svelte:fragment>
			<svelte:fragment slot="content">
				<div class="grid grid-cols-1 sm:grid-cols-4">
					<div class="place-items-center sm:flex">
						<SlideToggle class="mx-auto" active="bg-primary-500" bind:checked={hnEnabled}>Hacker News</SlideToggle>
					</div>
					<div class="place-items-center sm:flex">
						<SlideToggle class="mx-auto" active="bg-primary-500" bind:checked={tcEnabled}>Tech Crunch</SlideToggle>
					</div>
					<div class="place-items-center sm:flex">
						<SlideToggle class="mx-auto" active="bg-primary-500" bind:checked={engadgetEnabled}>Engadget</SlideToggle>
					</div>
					<div class="place-items-center sm:flex">
						<SlideToggle class="mx-auto" active="bg-primary-500" bind:checked={$hideVisitedPages}>Hide visited</SlideToggle>

					</div>
				</div>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
	<hr />
	{#each news as newsItem}
		<div class="card card-hover variant-soft-surface m-2" on:click={() => onItemClick(newsItem)}>
			<header>
			<!--{#if newsItem.media}
				<img alt="{newsItem.title}" src="{newsItem.media.url}" class="card-header-img" />
			{/if}-->
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
	{/each}
</div>
