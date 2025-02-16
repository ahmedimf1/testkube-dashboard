import {Action, Middleware, ThunkAction, configureStore} from '@reduxjs/toolkit';

import configSlice from '@redux/reducers/configSlice';
import executorsSlice from '@redux/reducers/executorsSlice';
import sourcesSlice from '@redux/reducers/sourcesSlice';
import testSuitesSlice from '@redux/reducers/testSuitesSlice';
import testsSlice from '@redux/reducers/testsSlice';

import {configApi} from '@services/config';
import {executionsApi} from '@services/executions';
import {executorsApi} from '@services/executors';
import {labelsApi} from '@services/labels';
import {repositoryApi} from '@services/repository';
import {sourcesApi} from '@services/sources';
import {testSuiteExecutionsApi} from '@services/testSuiteExecutions';
import {testSuitesApi} from '@services/testSuites';
import {testsApi} from '@services/tests';
import {triggersApi} from '@services/triggers';

export const middlewares: Middleware[] = [
  executionsApi.middleware,
  testsApi.middleware,
  testSuitesApi.middleware,
  labelsApi.middleware,
  testSuiteExecutionsApi.middleware,
  executorsApi.middleware,
  sourcesApi.middleware,
  triggersApi.middleware,
  configApi.middleware,
  repositoryApi.middleware,
];

export const reducers = {
  testSuites: testSuitesSlice,
  tests: testsSlice,
  config: configSlice,
  executors: executorsSlice,
  sources: sourcesSlice,

  [testSuitesApi.reducerPath]: testSuitesApi.reducer,
  [testsApi.reducerPath]: testsApi.reducer,
  [executionsApi.reducerPath]: executionsApi.reducer,
  [labelsApi.reducerPath]: labelsApi.reducer,
  [testSuiteExecutionsApi.reducerPath]: testSuiteExecutionsApi.reducer,
  [executorsApi.reducerPath]: executorsApi.reducer,
  [sourcesApi.reducerPath]: sourcesApi.reducer,
  [triggersApi.reducerPath]: triggersApi.reducer,
  [configApi.reducerPath]: configApi.reducer,
  [repositoryApi.reducerPath]: repositoryApi.reducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
