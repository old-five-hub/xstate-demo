import { createMachine, assign } from 'xstate';
import { EnumSubredditEventName } from './type';

type SelectState = {
  subreddit: string | null,
  posts: any,
  lastUpdated: number | null
}

type EventObjects = {
  type: EnumSubredditEventName.REFRESH,
} | {
  type: EnumSubredditEventName.RETRY,
}

type TypeEventObject = {
  value: 'loading',
  context: SelectState
} | {
  value: 'loaded',
  context: SelectState
} | {
  value: 'failure',
  context: SelectState
}

function invokeFetchSubreddit(context: {subreddit: string | null }) {
  const { subreddit } = context;

  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((response) => response.json())
    .then((json) => json.data.children.map((child: any) => child.data));
};

export const createSubredditMachine = (subreddit: string) => {
  return createMachine<SelectState, EventObjects, TypeEventObject>({
    id: 'subreddit',
    initial: 'loading',
    context: {
      subreddit, // subreddit name passed in
      posts: null,
      lastUpdated: null
    },
    states: {
      loading: {
        invoke: {
          id: 'fetch-subreddit',
          src: invokeFetchSubreddit,
          onDone: {
            target: 'loaded',
            actions: assign({
              posts: (_, event) => event.data,
              lastUpdated: (_, __) => Date.now()
            })
          },
          onError: 'failure'
        }
      },
      loaded: {
        on: {
          [EnumSubredditEventName.REFRESH]: 'loading'
        }
      },
      failure: {
        on: {
          [EnumSubredditEventName.RETRY]: 'loading'
        }
      }
    }
  });
}