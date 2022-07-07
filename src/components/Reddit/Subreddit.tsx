import React from 'react';
import { FC, useMemo } from 'react';
import { createSubredditMachine, retryFetching } from '@/models/reddit';
import { useMachine } from '@xstate/react';
import { Button } from '@arco-design/web-react';

type Props = {
  name: string
}

const Subreddit: FC<Props> = ({name}) => {
  const subredditMachine = useMemo(() => createSubredditMachine(name), [name]);
  
  const [current, send] = useMachine(subredditMachine);

  if (current.matches('failure')) {
    return (
      <div>
        获取信息失败
        <Button onClick={() => send(retryFetching())}>
          重试
        </Button>
      </div>
    )
  }

  return <Button>测试arco</Button>
}

export default Subreddit;