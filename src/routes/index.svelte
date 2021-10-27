<script>
	import testImage from './_test.image.json';
	import { Image } from '$lib';
</script>
<div class="w-prose prose-sm md:prose-2xl m-auto">
	<h1 class="text-center">Welcome to SvelteKit</h1>
	<h4 class="underline underline-red-500 underline-offset-4">Welcome!</h4>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur aliquid natus consequuntur
		est in debitis qui atque voluptate rerum, labore molestiae quas voluptatem distinctio eligendi a
		voluptates iusto ratione quam.
	</p>
	<Image data={testImage} />
</div>

