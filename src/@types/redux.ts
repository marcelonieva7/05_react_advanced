import { type store } from '@/libs/redux/store';

type AsyncThunkConfig = {
  dispatch: typeof store.instance.dispatch;
  extra: typeof store.extraArguments;
  state: ReturnType<typeof store.instance.getState>;
};

type RootState = ReturnType<typeof store.instance.getState>

type Dispatch = typeof store.instance.dispatch

export { type AsyncThunkConfig , type RootState, type Dispatch };