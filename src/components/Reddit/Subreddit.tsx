import React from 'react';
import { FC, useMemo } from 'react';
import { createSubredditMachine, retryFetching } from '@/models/reddit';
import { useMachine } from '@xstate/react';
import { Button, List, Spin } from '@arco-design/web-react';

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

  const { posts, lastUpdated } = current.context;

  if (current.matches('loading')) {
    return <Spin dot />
  }

  if (posts) {
    return (
      <List
        size='small'
        header={name}
        dataSource={posts}
        render={(item, index) => <List.Item key={index}>{item.title}</List.Item>}
        />
    )
  }

  return <div>sss</div>
  
}

export default Subreddit;