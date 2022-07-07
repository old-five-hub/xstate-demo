import { createMachine, assign } from 'xstate';
import { EnumRedditEventName } from './type';

export * from './event';
export * from './type';
export * from './subredditMachine';

type SelectState = {
  subreddit: string | null
}

type EventObjects = {
  type: EnumRedditEventName.SELECT,
  name: string
}

type TypeEventObject = {
  value: 'idle',
  context: SelectState
} | {
  value: 'selected',
  context: SelectState
}

export const redditMachine = createMachine<SelectState, EventObjects, TypeEventObject>({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null,
  },
  states: {
    idle: {},
    selected: {}
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