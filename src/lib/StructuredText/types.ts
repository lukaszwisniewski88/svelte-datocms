import type { NodeType, Mark } from 'datocms-structured-text-utils';
import type { SvelteComponentTyped } from 'svelte';

export type ComponentsMap = Partial<Record<NodeType | Mark, new (...any) => SvelteComponentTyped>>;
