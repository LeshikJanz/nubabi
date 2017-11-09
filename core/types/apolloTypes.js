// @flow
// prettier-ignore
import type { GraphQLError, DocumentNode, ExecutionResult } from 'graphql';

export interface QueryOptions {
  ssr?: boolean;
  variables?: {
    [key: string]: any,
  };
  fetchPolicy: FetchPolicy;
  pollInterval?: number;
  skip?: boolean;
}

export interface FetchMoreOptions {
  updateQuery: (
    previousQueryResult: Object,
    options: {
      fetchMoreResult: Object,
      queryVariables: Object,
    },
  ) => Object;
}

export interface UpdateQueryOptions {
  variables?: Object;
}

export interface SubscribeToMoreOptions {
  document: DocumentNode;
  variables?: {
    [key: string]: any,
  };
  updateQuery?: (
    previousQueryResult: Object,
    options: {
      subscribtionData: {
        data: any,
      },
      variables: {
        [key: string]: any,
      },
    },
  ) => Object;
  onError?: (error: Error) => void;
}

export type MutationQueryReducer = (
  previousResult: Object,
  options: {
    mutationResult: Object,
    queryName: Object,
    queryVariables: Object,
  },
) => Object;

export type MutationQueryReducersMap = {
  [queryName: string]: MutationQueryReducer,
};

export type OperationResultReducer = (
  previousResult: Object,
  action: ApolloAction,
  variables: Object,
) => Object;

export type OperationResultReducerMap = {
  [queryId: string]: OperationResultReducer,
};

export interface ModifiableWatchQueryOptions {
  variables?: {
    [key: string]: any,
  };
  pollInterval: number;
  fetchPolicy?: FetchPolicy;
  notifyOnNetworkStatusChange?: boolean;
  reducer?: OperationResultReducer;
}

export interface GraphQLDataProps {
  error?: ApolloError;
  networkStatus: number;
  loading: boolean;
  variables: {
    [variable: string]: any,
  };
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions & FetchMoreOptions,
  ) => Promise<ApolloQueryResult<any>>;
  startPolling: (pollInterval: number) => void;
  refetch: (variables?: any) => Promise<ApolloQueryResult<any>>;
  stopPolling: () => void;
  subscribeToMore: (options: SubscribeToMoreOptions) => () => void;
  updateQuery: (
    mapFn: (previousQueryResult: any, options: UpdateQueryOptions) => any,
  ) => void;
}

export interface InjectedGraphQLDataProps<T> {
  data?: T & GraphQLDataProps;
}

export type ApolloQueryResult<T> = {
  data: T,
  loading: boolean,
  networkStatus: NetworkStatus,
  stale: boolean,
};

const NetworkStatusEnum = Object.freeze({
  loading: 1,
  setVariables: 2,
  fetchMore: 3,
  refetch: 4,
  poll: 6,
  ready: 7,
  error: 8,
});

export type NetworkStatus = $Keys<typeof NetworkStatusEnum>;

export type ApolloError = {
  message: string,
  graphQLErrors: GraphQLError[],
  networkError: Error | null,
  extraInfo: any,
};

export type FetchPolicy =
  | 'cache-first'
  | 'cache-and-network'
  | 'network-only'
  | 'cache-only';

export type FetchMoreQueryOptions = {
  query?: DocumentNode,
  variables?: {
    [key: string]: any,
  },
};

export type WatchQueryOptions = {
  query: DocumentNode,
  metadata?: any,
} & ModifiableWatchQueryOptions;

export interface MutationOptions {
  mutation: DocumentNode;
  variables?: Object;
  optimisticResponse?: Object;
  updateQueries?: MutationQueryReducersMap;
  refetchQueries?: string[] | PureQueryOptions[];
  update?: MutationUpdaterFn;
}

export interface DataProxy {
  readQuery<QueryType>(options: DataProxyReadQueryOptions): QueryType;
  readFragment<FragmentType>(
    options: DataProxyReadFragmentOptions,
  ): FragmentType | null;
  writeQuery(options: DataProxyWriteQueryOptions): void;
  writeFragment(options: DataProxyWriteFragmentOptions): void;
}

export interface DataProxyReadQueryOptions {
  query: DocumentNode;
  variables?: Object;
}

export interface DataProxyReadFragmentOptions {
  id: string;
  fragment: DocumentNode;
  fragmentName?: string;
  variables?: Object;
}

export interface DataProxyWriteQueryOptions {
  data: any;
  query: DocumentNode;
  variables?: Object;
}

export interface DataProxyWriteFragmentOptions {
  data: any;
  id: string;
  fragment: DocumentNode;
  fragmentName?: string;
  variables?: Object;
}

export type PureQueryOptions = {
  query: DocumentNode,
  variables?: {
    [key: string]: any,
  },
};

export type ApolloAction =
  | QueryResultAction
  | QueryErrorAction
  | QueryInitAction
  | QueryResultClientAction
  | QueryStopAction
  | MutationInitAction
  | MutationResultAction
  | MutationErrorAction
  | UpdateQueryResultAction
  | StoreResetAction
  | SubscriptionResultAction
  | WriteAction;

export type QueryResultAction = {
  type: 'APOLLO_QUERY_RESULT',
  result: ExecutionResult,
  queryId: string,
  document: DocumentNode,
  operationName: string,
  requestId: number,
  fetchMoreForQueryId?: string,
  extraReducers?: ApolloReducer[],
};

export interface QueryErrorAction {
  type: 'APOLLO_QUERY_ERROR';
  error: Error;
  queryId: string;
  requestId: number;
  fetchMoreForQueryId?: string;
}

export interface QueryInitAction {
  type: 'APOLLO_QUERY_INIT';
  queryString: string;
  document: DocumentNode;
  variables: Object;
  fetchPolicy: FetchPolicy;
  queryId: string;
  requestId: number;
  storePreviousVariables: boolean;
  isRefetch: boolean;
  isPoll: boolean;
  fetchMoreForQueryId?: string;
  metadata: any;
}

export interface QueryResultClientAction {
  type: 'APOLLO_QUERY_RESULT_CLIENT';
  result: ExecutionResult;
  complete: boolean;
  queryId: string;
  requestId: number;
}

export interface QueryStopAction {
  type: 'APOLLO_QUERY_STOP';
  queryId: string;
}

export interface MutationInitAction {
  type: 'APOLLO_MUTATION_INIT';
  mutationString: string;
  mutation: DocumentNode;
  variables: Object;
  operationName: string;
  mutationId: string;
  optimisticResponse: Object | void;
  extraReducers?: ApolloReducer[];
  updateQueries?: {
    [queryId: string]: MutationQueryReducer,
  };
}

export interface MutationResultAction {
  type: 'APOLLO_MUTATION_RESULT';
  result: ExecutionResult;
  document: DocumentNode;
  operationName: string;
  variables: Object;
  mutationId: string;
  extraReducers?: ApolloReducer[];
  updateQueries?: {
    [queryId: string]: MutationQueryReducer,
  };
  update?: (proxy: DataProxy, mutationResult: Object) => void;
}

export interface MutationErrorAction {
  type: 'APOLLO_MUTATION_ERROR';
  error: Error;
  mutationId: string;
}

export interface UpdateQueryResultAction {
  type: 'APOLLO_UPDATE_QUERY_RESULT';
  variables: any;
  document: DocumentNode;
  newResult: Object;
}

export interface StoreResetAction {
  type: 'APOLLO_STORE_RESET';
  observableQueryIds: string[];
}

export interface SubscriptionResultAction {
  type: 'APOLLO_SUBSCRIPTION_RESULT';
  result: ExecutionResult;
  subscriptionId: number;
  variables: Object;
  document: DocumentNode;
  operationName: string;
  extraReducers?: ApolloReducer[];
}

export interface WriteAction {
  type: 'APOLLO_WRITE';
  writes: Array<DataWrite>;
}

export interface DataWrite {
  rootId: string;
  result: any;
  document: DocumentNode;
  variables: Object;
}

export type ApolloReducer = (
  store: NormalizedCache,
  action: ApolloAction,
) => NormalizedCache;

export interface Store {
  data: NormalizedCache;
  queries: QueryStore;
  mutations: MutationStore;
  optimistic: OptimisticStore;
  reducerError: Error | null;
}

export interface NormalizedCache {
  [dataId: string]: StoreObject;
}

export interface StoreObject {
  [storeFieldKey: string]: StoreValue;
  __typename?: string;
}

export interface IdValue {
  type: 'id';
  id: string;
  generated: boolean;
}

export interface JsonValue {
  type: 'json';
  json: any;
}

export type StoreValue =
  | number
  | string
  | string[]
  | IdValue
  | JsonValue
  | null
  | void;

export interface QueryStore {
  [queryId: string]: QueryStoreValue;
}

export type QueryStoreValue = {
  queryString: string,
  document: DocumentNode,
  variables: Object,
  previousVariables: Object | null,
  networkStatus: NetworkStatus,
  networkError: Error | null,
  graphqlErrors: GraphQLError[],
  lastRequestId: number,
  metadata: any,
};

export interface MutationStore {
  [mutationId: string]: MutationStoreValue;
}

export interface MutationStoreValue {
  mutationString: string;
  variables: Object;
  loading: boolean;
  error: Error | null;
}

export type OptimisticStoreItem = {
  mutationId: string,
  data: NormalizedCache,
};

export type OptimisticStore = OptimisticStoreItem[];

export type MutationUpdaterFn = (
  proxy: DataProxy,
  mutationResult: Object,
) => void;
