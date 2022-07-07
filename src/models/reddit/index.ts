import { createMachine, assign } from 'xstate';
import { EnumRedditEventName, EventObjects, SelectState, EnumLoadingState, SelectTypeState } from './type';

export * from './event';
export * from './type';

function invokeFetchSubreddit(context: {subreddit: string | null}) {
  const { subreddit } = context;

  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((response) => response.json())
    .then((json) => json.data.children.map((child: any) => child.data));
}

export const redditMachine = createMachine<SelectState, EventObjects>({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null,
    posts: null
  },
  states: {
    idle: {},
    selected: {
      initial: EnumLoadingState.LOADING,
      states: {
        [EnumLoadingState.LOADING]: {
          invoke: {
            id: 'fetch-subreddit',
            src: invokeFetchSubreddit,
            onDone: {
              target: EnumLoadingState.LOADED,
              actions: assign({
                posts: (context, event) => event.data
              })
            },
            onError: EnumLoadingState.FAILED
          }
        },
        [EnumLoadingState.LOADED]: {},
        [EnumLoadingState.FAILED]: {}
      }
    }
  },
  on: {
    [EnumRedditEventName.SELECT]: {
      target: '.selected',
      actions: assign({
        subreddit: (context, event) => event.name
      })
    }
  }
});
