import { EnumRedditEventName } from './type';
export const select = (name: string) => {
  return (
    { type: EnumRedditEventName.SELECT, name }
  )
}