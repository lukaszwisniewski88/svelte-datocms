import { getContext as getSvelteContext, setContext as setSvelteContext } from 'svelte';
import type { Writable } from 'svelte/store';
import type { ComponentsMap } from './types';

const key = 'components';

const getContext = () => getSvelteContext<Writable<ComponentsMap>>(key);
const setContext = (mappingStore: Writable<ComponentsMap>) => setSvelteContext(key, mappingStore);

export { getContext, setContext };
