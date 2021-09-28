<script>
	export let title = '';
	export let slug = '';
</script>

<a href={slug}><slot><span>{title}</span></slot></a>
