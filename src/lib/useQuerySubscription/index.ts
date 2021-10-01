import { subscribeToQuery } from 'datocms-listen';
import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { UnsubscribeFn, ChannelErrorData, ConnectionStatus, Options } from 'datocms-listen';

type Maybe<T> = T | null;
export type SubscribeToQueryOptions<QueryResult, QueryVariables> = Omit<
	Options<QueryResult, QueryVariables>,
	'onStatusChange' | 'onUpdate' | 'onChannelError'
>;

export type EnabledQueryListenerOptions<QueryResult, QueryVariables> = {
	/** Whether the subscription has to be performed or not */
	enabled?: true;
	/** The initial data to use while the initial request is being performed */
	initialData?: QueryResult;
} & SubscribeToQueryOptions<QueryResult, QueryVariables>;

export type DisabledQueryListenerOptions<QueryResult, QueryVariables> = {
	/** Whether the subscription has to be performed or not */
	enabled: false;
	/** The initial data to use while the initial request is being performed */
	initialData?: QueryResult;
} & Partial<SubscribeToQueryOptions<QueryResult, QueryVariables>>;

export type QueryListenerOptions<QueryResult, QueryVariables> =
	| EnabledQueryListenerOptions<QueryResult, QueryVariables>
	| DisabledQueryListenerOptions<QueryResult, QueryVariables>;

export type QuerySubscriptionState<QueryResult = unknown> = {
	error: Maybe<ChannelErrorData>;
	data: Maybe<QueryResult>;
	status: ConnectionStatus;
};

export function useQuerySubscription<
	QueryResult = unknown,
	QueryVariables = Record<string, unknown>
>(
	options: QueryListenerOptions<QueryResult, QueryVariables>
): Readable<QuerySubscriptionState<QueryResult>> {
	const { enabled, initialData, ...other } = options;
	const subscribeToQueryOptions = other as EnabledQueryListenerOptions<QueryResult, QueryVariables>;
	const { subscribe, update: updateStore } = writable<QuerySubscriptionState<QueryResult>>(
		{
			data: initialData || null,
			error: null,
			status: enabled ? 'connecting' : 'closed'
		},
		() => {
			let unsubscribe: Maybe<UnsubscribeFn>;
			if (!enabled) {
				updateStore((state) => ({ ...state, status: 'closed' }));
				return () => {
					if (unsubscribe) {
						console.log('closing...');
						unsubscribe();
					}
					// do nothing here
				};
			}
			if (window)
				subscribeToQuery<QueryResult, QueryVariables>({
					...subscribeToQueryOptions,
					onStatusChange: (status) => updateStore((state) => ({ ...state, status })),
					onUpdate: (updatedData) =>
						updateStore((state) => ({ ...state, data: updatedData.response.data })),
					onChannelError: (error) => updateStore((state) => ({ ...state, error }))
				}).then((result) => (unsubscribe = result));

			return () => {
				console.log('closing...');
				if (unsubscribe) unsubscribe();
			};
		}
	);

	return { subscribe };
}
