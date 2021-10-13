<script>
	export let title = '';
	export let slug = '';
	// rest props used to receive meta attributes.
</script>

<a href={slug} {...$$restProps}><slot><span>{title}</span></slot></a>
