import './App.css';
import { useState, useMemo, useEffect, useRef } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  const [paused, setPaused] = useState(false);

  const point = useRef(null);
  const pausedAt = useRef(null);
  const timer = useRef(null);
  const cover = useRef(null);

  const interval = 1000;

  const start = () => {
    if (timer.current || cover.interval) return console.log('Timer is already running');

    pausedAt.current = null;
    cover.current = null;

    timer.current = setInterval(() => {
      point.current = new Date();
      setCounter((state) => state + 1);
    }, interval);
  };

  const pause = () => {
    if (!timer.current && !cover.current) return console.log('Timer is not running');
    if (pausedAt.current) return console.log('Timer is already paused');

    if (cover.current) {
      console.log('Clearing cover up');
      clearTimeout(cover.current);
      cover.current = null;
    }

    if (timer.current) {
      console.log('Clearing timer');
      clearInterval(timer.current);
      timer.current = null;
    }

    pausedAt.current = new Date();

    console.log('Paused at: ', pausedAt.current);

    return pausedAt.current;
  };

  const resume = () => {
    if (timer.current) return console.log('Timer is already running');
    if (cover.current) return console.log('Timer is in cover up');

    if (!pausedAt.current) return console.log('Timer is not paused');

    const cover_up = interval - (pausedAt.current - point.current);
    pausedAt.current = null;

    if (cover_up > 0) {
      cover.current = setTimeout(() => {
        point.current = new Date();
        setCounter((state) => state + 1);
        start();
      }, cover_up);
    } else {
      start();
    }

    return pausedAt.current;
  };

  const stop = () => {
    timer.current && clearInterval(timer.current);
    cover.current && clearTimeout(cover.current);

    timer.current = null;
    cover.current = null;
    point.current = null;
    pausedAt.current = null;

    setCounter(0);
  };

  const toggle = () => {
    if (timer.current || cover.current) {
      console.log('Toggle Pausing');
      pause();
    } else {
      console.log('Toggle Resuming');
      resume();
    }

    setPaused(() => {
      if (timer.current || cover.current) return false;
      return true;
    });
  };

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, []);

  return (
    <div className='App'>
      <h1 id='counter-1'>
        Counter : <span data-testid='counter-1'>{counter}</span>
      </h1>
      <h1 id='counter-2'>
        Counter : <span data-testid='counter-2'>{counter < 10 ? counter : 10}</span>
      </h1>
      <button onClick={toggle}>{!paused ? 'Pause' : 'Resume'}</button>
    </div>
  );
}

export default App;
