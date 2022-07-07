import { EnumRedditEventName, EnumSubredditEventName } from './type';

export const selectReddit = (name: string) => {
  return (
    { type: EnumRedditEventName.SELECT, name }
  )
}


export const retryFetching = () => ({type: EnumSubredditEventName.RETRY})