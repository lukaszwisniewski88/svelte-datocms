import { getContext as getSvelteContext, setContext as setSvelteContext } from 'svelte';
import { writable } from 'svelte/store';
import type { ComponentsMap } from './types';
import type { Writable } from 'svelte/store';

const componentsKey = 'components';

const getContext = (): Writable<ComponentsMap> =>
	getSvelteContext<Writable<ComponentsMap>>(componentsKey);
const setContext = (components: ComponentsMap): void =>
	setSvelteContext(componentsKey, writable(components));

//const getLinksContext;
//const setLinksContext;

export { getContext, setContext };
