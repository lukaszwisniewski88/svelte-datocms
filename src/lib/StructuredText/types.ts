import type { NodeType, Mark, Record as DatoRecord } from 'datocms-structured-text-utils';
import type { SvelteComponentTyped } from 'svelte';

type RecordsComponents = Record<string, new (...any) => SvelteComponentTyped>;
export type ComponentsMap = Partial<Record<NodeType | Mark, new (...any) => SvelteComponentTyped>> &
	RecordsComponents;
export type Records = {
	blocks: DatoRecord[];
	links: DatoRecord[];
};
