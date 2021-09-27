import { setContext as svelteSetContext, getContext } from 'svelte';
import type { Record as DatoRecord } from 'datocms-structured-text-utils';
const blocksMap: Record<string, DatoRecord> = {};
const linksMap: Record<string, DatoRecord> = {};

const blocksContextKey = 'blocks';
const linksContextKey = 'links';

export const setContext = (
	blocks: DatoRecord[] | undefined,
	links: DatoRecord[] | undefined
): void => {
	if (blocks) {
		blocks.forEach((block) => {
			const { id, __typename, ...props } = block;
			blocksMap[id] = { __typename, ...props, id };
		});
		svelteSetContext(blocksContextKey, blocksMap);
	}
	if (links) {
		links.forEach((link) => {
			const { id, ...props } = link;
			linksMap[id] = { ...props, id };
		});
		svelteSetContext(linksContextKey, linksMap);
	}
};

export const getBlocksContext = (): typeof blocksMap => {
	return getContext<Record<string, DatoRecord>>(blocksContextKey);
};
export const getLinksContext = (): typeof linksMap => {
	return getContext<Record<string, DatoRecord>>(linksContextKey);
};
