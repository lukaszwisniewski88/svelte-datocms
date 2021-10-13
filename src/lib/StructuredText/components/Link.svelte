<script lang='ts'>
	import type {MetaEntry} from 'datocms-structured-text-utils'
	import {metaToAttributes} from '../../utils/metaToAttributes'
	export let url:string;
	export let meta : MetaEntry[];
	const attributes : Record<string, string> = metaToAttributes(meta)
</script>

<a href={url} {...attributes} ><slot /></a>
