import { useMachine } from '@xstate/react';
import { redditMachine, select } from './models/reddit';

const subreddits = ['frontend', 'reactjs', 'vuejs'];

function App() {
  const [current, send] = useMachine(redditMachine);
  const { subreddit, posts } = current.context;

  console.log(current);

  return (
    <main>
      <header>
        <select
          onChange={(e) => {
            send(select(e.target.value));
          }}
        >
          {subreddits.map((subreddit) => {
            return <option key={subreddit}>{subreddit}</option>;
          })}
        </select>
      </header>
      <section>
        <h1>{current.matches('idle') ? 'Select a subreddit' : subreddit}</h1>
        {current.matches({ selected: 'LOADING' }) && <div>Loading...</div>}
        {current.matches({ selected: 'LOADED' }) && (
          <ul>
            {posts.map((post: any) => (
              <li key={post.title}>{post.title}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App;
