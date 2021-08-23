<script context="module" lang="ts">
	import { decode } from 'blurhash';
	type DrawOptions = {
		height: number;
		width: number;
		canvas: HTMLCanvasElement;
		punch: number;
	};
	function draw(hash: string, options: DrawOptions) {
		const { height, width, punch } = options;
		const pixels = decode(hash, width, height, punch);
		const ctx = options.canvas.getContext('2d');
		const imageData = ctx.createImageData(width, height);
		imageData.data.set(pixels);
		ctx.putImageData(imageData, 0, 0);
	}
</script>

<script lang="ts">
	export let hash: string;
	export let height: number = 32;
	export let width: number = 32;
	export let punch: number = 1;

	let canvas: HTMLCanvasElement | undefined;
	$: if (canvas && hash) {
		draw(hash, { width, height, punch, canvas });
	} else if (!hash) {
		console.error('There is nothing to DRAW!');
	}
</script>

<canvas {width} {height} bind:this={canvas} />

<style>
	canvas {
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		width: 100%;
		height: 100%;
	}
</style>
