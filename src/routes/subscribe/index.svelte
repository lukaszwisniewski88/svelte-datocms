<script lang="ts">
	import { StructuredText, Image, useQuerySubscription } from '$lib';
	import type { QueryResponseType, QueryVariables } from './_query';
	import { query } from './_query';
	let enabled = true;
	let pageSize = 10;
	let pageSizeTemp = 10;
	const statusMessage = {
		connecting: 'Connecting to DatoCMS...',
		connected: 'Connected to DatoCMS, receiving live updates!',
		closed: 'Connection closed'
	};
	$: store = useQuerySubscription<QueryResponseType, QueryVariables>({
		query,
		variables: { first: pageSize },
		token: 'faeb9172e232a75339242faafb9e56de8c8f13b735f7090964',
		enabled
	});
	$: ({ data, error, status } = $store);
</script>

<main class="container mx-auto px-8">
	<h1 class="font-semibold text-5xl">Dato CMS Blog</h1>
	<h2 class="text-2xl">News, tips, highlights, and other updates from the team at DatoCMS.</h2>
	<div class="flex flex-row m-4 gap-6 place-items-center">
		{#if enabled}
			<div class="rounded-full bg-green-400 h-[12px] w-[12px] relative">
				<div
					class="border rounded-full border-green-400/50 h-[12px] shadow-md animate-heart-beat animate-loop w-[12px] animate-duration-1000 absolute"
				/>
			</div>
		{:else}
			<div class="rounded-full bg-red-400 h-[12px] w-[12px]" />
		{/if}
		<diu class="font-mono text sm "> Status : {statusMessage[status]}</diu>
		<button
			class="rounded bg-gray-500 text-white py-2 px-4 inline-flex place-items-center"
			on:click={() => (enabled = !enabled)}>{enabled ? 'Disconnect' : 'Connect'}</button
		>
	</div>
	<div>
		<span>
			Page size : {pageSizeTemp}
		</span>
		<input
			type="range"
			min="1"
			max="25"
			bind:value={pageSizeTemp}
			on:mouseup={() => (pageSize = pageSizeTemp)}
		/>
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
	{#if data && enabled}
		<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
			{#each data.blogPosts as post}
				<article class="border flex flex-col shadow my-8 gap-4 place-content-between">
					<div>
						<Image data={post.coverImage.responsiveImage} />
						<h6 class="font-semibold text-xl p-2 hover:opacity-50 hover:underline">
							<a rel="external" href={`https://www.datocms.com/blog/${post.slug}`}>
								{post.title}
							</a>
						</h6>
					</div>
					<div class="p-2">
						<StructuredText data={post.excerpt} />
					</div>
					<footer
						class="bg-gray-300 pr-2 gap-6 inline-flex place-items-center place-content-between"
					>
						<div class="h-10 w-10 overflow-hidden">
							<Image data={post.author.avatar.responsiveImage} />
						</div>
						Written by {post.author.name}
					</footer>
				</article>
			{:else}
				No Posts
			{/each}
		</div>
	{/if}
</main>
<slot />
