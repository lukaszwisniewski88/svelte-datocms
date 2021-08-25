<script lang="ts">
	import Image from '$lib/Image/Image.svelte';
	import { useQuerySubscription } from '$lib/useQuerySubscription';
	import type { QueryResponseType, QueryVariables } from './_query';
	import { query } from './_query';
	let enabled = true;
	$: store = useQuerySubscription<QueryResponseType, QueryVariables>({
		query,
		variables: { first: 10 },
		token: 'faeb9172e232a75339242faafb9e56de8c8f13b735f7090964',
		enabled
	});
	const statusMessage = {
		connecting: 'Connecting to DatoCMS...',
		connected: 'Connected to DatoCMS, receiving live updates!',
		closed: 'Connection closed'
	};
	$: ({ data, error, status } = $store);
	$: console.log(data);
</script>

<main class="container mx-auto">
	<h1 class="text-5xl font-semibold">Dato CMS Blog</h1>
	<h2 class="text-2xl">News, tips, highlights, and other updates from the team at DatoCMS.</h2>
	<div class="flex flex-row gap-6 m-4 place-items-center">
		<diu class="font-mono text sm "> Status : {statusMessage[status]}</diu>
		<button
			class="py-2 px-4 rounded bg-gray-500 text-white inline-flex place-items-center"
			on:click={() => (enabled = !enabled)}>{enabled ? 'Disconnect' : 'Connect'}</button
		>
	</div>

	{#if error}
		<div>
			<h1>Error: {error.code}</h1>
			<div>{error.message}</div>
			{#if error.response}
				<pre>{JSON.stringify(error.response, null, 2)}</pre>
			{/if}
		</div>
	{/if}
	{#if data}
		{#each data.blogPosts as post}
			<article class="flex flex-col gap-4 my-8">
				<Image data={post.coverImage.responsiveImage} />
				<h6 class="text-xl font-semibold hover:underline hover:opacity-50">
					<a rel="external" href={`https://www.datocms.com/blog/${post.slug}`}> {post.title} </a>
				</h6>
				<div>
					<pre>{post.excerpt}</pre>
				</div>
				<footer class="inline-flex place-items-center gap-6">
					<div class="rounded-full h-10 w-10 overflow-hidden">
						<Image data={post.author.avatar.responsiveImage} />
					</div>
					Written by {post.author.name}
				</footer>
			</article>
		{/each}
	{/if}
</main>
