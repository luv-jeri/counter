import './App.css';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';

class Timer {
  constructor(setter, interval = 1000) {
    if (typeof setter !== 'function') throw new Error('setter must be a function');

    setter((state) => {
      if (state !== 0) throw new Error('state must be 0');
      return 0;
    });

    this.setter = setter;
    this.interval = interval;
    this.point = new Date();
    this.pausedAt = null;
    this.timer = null;
  }

  start() {
    this.timer = setInterval(() => {
      this.point = new Date();
      console.log(this.point);
      this.setter((state) => state + 1);
    }, this.interval);
  }

  pause() {
    if (!this.timer) return console.log('Timer is not running');
    if (this.pausedAt) return console.log('Timer is already paused');

    this.pausedAt = new Date();
    clearInterval(this.timer);
  }

  resume() {
    if (this.timer) return console.log('Timer is already running');
    if (!this.pausedAt) return console.log('Timer is not paused');

    const diff = this.pausedAt - this.point;
    setTimeout(() => {
      this.point = new Date();
      this.setter((state) => state + 1);
      this.start();
    }, diff);
  }

  stop() {
    if (!this.timer) return console.log('Timer is not running');

    this.setter(0);
    clearInterval(this.timer);
  }
}

function App() {
  const [counter, setCounter] = useState(0);

  const timer = useMemo(() => new Timer(setCounter), []);
  console.log(timer);
  // let i = useRef();
  // let point = useRef();
  // let pausedAt = useRef();

  // const setTimer = useCallback((point) => {
  //   if (!point || typeof point !== 'object')
  //     throw new Error('setTimer: point is not a valid reference');

  //   const interval = setInterval(() => {
  //     point.current = new Date();
  //     console.log('point', point.current);
  //     setCounter((state) => state + 1);
  //   }, 1000);

  //   return interval;
  // }, []);

  // useEffect(() => {
  //   i.current = setTimer(point);
  //   return () => {
  //     clearInterval(i.current);
  //   };
  // }, [setTimer]);

  // const handleStop = () => {
  //   pausedAt.current = new Date();
  //   console.log('pausedAt', pausedAt.current);
  //   clearInterval(i.current);
  // };

  // const handleStart = () => {
  //   const diff = pausedAt.current - point.current;
  //   console.log('diff', diff);
  //   pausedAt.current = null;
  //   setTimeout(() => {
  //     setCounter((state) => state + 1);
  //     i.current = setTimer(point);
  //   }, diff);
  // };

  return (
    <div className='App'>
      <h1> Counter : {counter} </h1>
      <h1> Counter : {counter < 10 ? counter : 10} </h1>
      {/* <button
        onClick={() => {
          const { current } = pausedAt;
          current ? handleStart() : handleStop();
        }}
      >
        Pause{' '}
      </button> */}
    </div>
  );
}

export default App;
