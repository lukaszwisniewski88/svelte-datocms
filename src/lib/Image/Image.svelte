<script context="module" lang="ts">
	export type ResponsiveImageType = {
		/** The aspect ratio (width/height) of the image */
		aspectRatio: number;
		/** A base64-encoded thumbnail to offer during image loading */
		base64?: string;
		/** The height of the image */
		height?: number;
		/** The width of the image */
		width: number;
		/** The HTML5 `sizes` attribute for the image */
		sizes?: string;
		/** The fallback `src` attribute for the image */
		src?: string;
		/** The HTML5 `srcSet` attribute for the image */
		srcSet?: string;
		/** The HTML5 `srcSet` attribute for the image in WebP format, for browsers that support the format */
		webpSrcSet?: string;
		/** The background color for the image placeholder */
		bgColor?: string;
		/** Alternate text (`alt`) for the image */
		alt?: string;
		/** Title attribute (`title`) for the image */
		title?: string;
	};
	type State = {
		lazyLoad: boolean;
		inView: boolean;
		loaded: boolean;
	};
	const browser = typeof window !== 'undefined';
	const isIntersectionObserverAvailable = browser ? !!window.IntersectionObserver : false;
	function imageAddStrategy(state: State) {
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
	function imageShowStrategy(state: State) {
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
		: window.btoa;
</script>

<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import { writable } from 'svelte/store';
	export let lazyLoad = true;
	export let explicitWidth = false;
	export let fadeInDuration = 500;
	export let data: ResponsiveImageType;
	export let intersectionTreshold = 0.1;
	function loadHandler() {
		$state.loaded = true;
	}
	const { width, aspectRatio } = data;
	const height = data.height || width / aspectRatio;
	let element: HTMLDivElement;

	const state = writable<State>({
		lazyLoad,
		inView: false,
		loaded: false
	});

	$: addImage = imageAddStrategy($state);
	$: showImage = imageShowStrategy($state);
</script>

<IntersectionObserver bind:intersecting={$state.inView} {element} threshold={intersectionTreshold}>
	<div
		class="relative-positioning"
		bind:this={element}
		style={`display:${explicitWidth ? 'inline-block' : 'block'}`}
	>
		<img
			class="block"
			class:w-full={!explicitWidth}
			src={`data:image/svg+xml;base64,${universalBtoa(svg(width, height))}`}
			alt="placeholder"
			role="presentation"
			style={explicitWidth ? `width:${width}px` : ''}
		/>
		<div
			class="absolute-positioning"
			class:vsible={!showImage}
			style={`background-color:${data.bgColor ? data.bgColor : '#000'};` +
				`background-image:url(${data.base64});background-size:cover;`}
		/>

		{#if addImage}
			<picture>
				<source srcset={data.webpSrcSet} />
				<source srcset={data.srcSet} />
				{#if data.src}
					<img
						src={data.src}
						alt={data.alt}
						title={data.title}
						on:load={loadHandler}
						class:visible={showImage}
						class:invisible={!showImage}
						class="absolute-positioning transition-opacity"
						style={`transition-duration:${fadeInDuration}ms;`}
					/>
				{/if}
			</picture>
		{/if}
	</div>
</IntersectionObserver>

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
	.block {
		display: block;
	}
	.w-full {
		width: 100%;
	}
	.visible {
		opacity: 1;
	}
	.invisible {
		opacity: 0;
	}
</style>
