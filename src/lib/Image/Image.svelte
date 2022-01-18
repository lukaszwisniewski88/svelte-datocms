<script lang="ts">
	import inView from './inView';
	import { writable } from 'svelte/store';
	export let lazyLoad = true;
	export let explicitWidth = false;
	export let fadeInDuration = 500;
	export let data: ResponsiveImageType;
	export let intersectionTreshold = 0.1;
	const browser = typeof window !== 'undefined';
	const isIntersectionObserverAvailable = browser ? !!window.IntersectionObserver : false;
	function imageAddStrategy(state: ImageState) {
		const { inView, lazyLoad, loaded } = state;
		if (!lazyLoad) {
			return true;
		}

		if (!browser) {
			return false;
		}

		if (isIntersectionObserverAvailable) {
			return inView || loaded;
		}
		return true;
	}
	function imageShowStrategy(state: ImageState) {
		const { lazyLoad, loaded } = state;
		if (!lazyLoad) {
			return true;
		}

		if (!browser) {
			return false;
		}

		if (isIntersectionObserverAvailable) {
			return loaded;
		}

		return true;
	}
	function svg(width: number, height: number) {
		return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"></svg>`;
	}
	const universalBtoa = !browser
		? (str: string) => Buffer.from(str.toString(), 'binary').toString('base64')
		: window.btoa.bind(window);

	function loadHandler() {
		$state.loaded = true;
	}
	const { width, aspectRatio } = data;
	const height = data.height || width / aspectRatio;

	const state = writable<ImageState>({
		lazyLoad,
		inView: false,
		loaded: false
	});
	$: addImage = imageAddStrategy($state);
	$: showImage = imageShowStrategy($state);
</script>

<div
	use:inView={{ threshold: intersectionTreshold, once: true, root: null, rootMargin: '120px' }}
	on:inview={({ detail }) => ($state.inView = detail.isInView)}
	aria-label="image container"
	class="relative-positioning"
	style:display={explicitWidth ? 'inline-block' : 'block'}
>
	<img
		class="d-block"
		src={`data:image/svg+xml;base64,${universalBtoa(svg(width, height))}`}
		role="none"
		alt="placeholder sizing"
		style:width={explicitWidth ? `${width}px` : '100%'}
	/>
	<div
		class="absolute-positioning"
		role="presentation"
		aria-label="placeholder image"
		class:visible={!showImage}
		style:background-color={data.bgColor || '#000'}
		style:background-image={`url(${data.base64}`}
		style:background-size="cover"
	/>

	{#if addImage}
		<picture>
			{#if data.webpSrcSet}
				<source srcset={data.webpSrcSet} />
			{/if}
			{#if data.srcSet}
				<source srcset={data.srcSet} />
			{/if}
			{#if data.src}
				<img
					src={data.src}
					alt={data.alt}
					title={data.title}
					on:load={loadHandler}
					class:visible={showImage}
					class:invisible={!showImage}
					class="transition-opacity absolute-positioning"
					style:transition-duration={`${fadeInDuration}ms;`}
				/>
			{/if}
		</picture>
	{/if}
</div>

<style>
	.absolute-positioning {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
	}
	.relative-positioning {
		position: relative;
	}
	.transition-opacity {
		transition-property: opacity;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}
	.d-block {
		display: block;
	}
	.visible {
		opacity: 1;
	}
	.invisible {
		opacity: 0;
	}
</style>
