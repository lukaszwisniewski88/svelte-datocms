import { getContext as getSvelteContext, setContext as setSvelteContext, hasContext } from 'svelte';
import { writable } from 'svelte/store';
import type { ComponentsMap } from './types';
import type { Writable } from 'svelte/store';

const componentsKey = 'components';

const getContext = (): Writable<ComponentsMap> => {
	if (hasContext(componentsKey)) {
		return getSvelteContext<Writable<ComponentsMap>>(componentsKey);
	}
	return writable({});
};
const setContext = (components: ComponentsMap): void => {
	if (components) {
		setSvelteContext(componentsKey, writable(components));
	}
};

//const getLinksContext;
//const setLinksContext;

export { getContext, setContext };
