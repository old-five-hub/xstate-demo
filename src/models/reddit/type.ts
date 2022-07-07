export enum EnumRedditEventName {
  SELECT = 'SELECT'
}

export enum EnumLoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  FAILED = 'FAILED',
}

export type SelectState = {
  posts: any;
  subreddit: string | null;
}

export type SelectTypeState = {
  [EnumRedditEventName.SELECT]: EnumLoadingState
}

export type SelectEvent = {
  type: EnumRedditEventName.SELECT,
  name: string
};


export type EventObjects = SelectEvent