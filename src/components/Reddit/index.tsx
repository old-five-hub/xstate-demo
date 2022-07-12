import React from 'react';
import Subreddit from './Subreddit';
import { redditMachine, selectReddit } from '@/models/reddit';
import { useMachine } from '@xstate/react';
import { Select } from '@arco-design/web-react';

const subreddits = ['frontend', 'reactjs', 'vuejs'];

const Reddit = () => {
  const [current, send] = useMachine(redditMachine);
  const { subreddit } = current.context;

  return <div>
   <div style={{width: '200px'}}>
    <Select value={subreddit || ''} onChange={val => send(selectReddit(val))}>
        {
          subreddits.map(i => <Select.Option key={i} value={i}>
            {i}
          </Select.Option>)
        }
      </Select>
   </div>
   {
     subreddit && <Subreddit name={subreddit}  key={subreddit} />
   }
  </div>
}

export default Reddit;