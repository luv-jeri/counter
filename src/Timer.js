class Timer {
  constructor(setter, interval = 1000) {
    console.log('New Timer created ⏱️, interval: ', interval);
    if (typeof setter !== 'function') throw new Error('setter must be a function');
    if (typeof interval !== 'number') throw new Error('interval must be a number');
    if (interval < 0) throw new Error('interval must be greater than 0');

    setter((state) => {
      if (typeof state !== 'number') throw new Error('state must be a number');
      return state;
    });

    this.setter = setter;
    this.interval = interval;
    this.point = null;
    this.pausedAt = null;
    this.timer = null;
    this.cover = null;
  }

  start() {
    console.log('Starting timer ▶️');

    if (this.timer) return console.log('Timer is already running');

    if (this.cover) {
      clearTimeout(this.cover);
      this.cover = null;
    }

    this.pausedAt = null;
    this.point = new Date();

    this.timer = setInterval(() => {
      this.point = new Date();
      this.setter((state) => state + 1);
    }, this.interval);
  }

  pause() {
    console.log('Timer pausing ⏸️');

    if (!this.timer && !this.cover) return console.log('Timer is not running');
    if (this.pausedAt) return console.log('Timer is already paused');

    this.pausedAt = new Date();

    if (this.cover) {
      clearTimeout(this.cover);
      this.cover = null;
    }

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    console.log('Paused at: ', this.pausedAt);

    return this.pausedAt;
  }

  resume() {
    console.log('Timer resumed ▶️');

    if (this.timer || this.cover) return console.log('Timer is already running');
    if (!this.pausedAt) return console.log('Timer is not paused');

    const covere_up = this.interval - (this.pausedAt - this.point);
    console.log('Covere up time: ', covere_up);

    this.pausedAt = null;

    this.cover = setTimeout(() => {
      this.point = new Date();
      this.setter((state) => state + 1);
      this.start();
    }, covere_up);

    return this.pausedAt;
  }

  stop() {
    this.timer && clearInterval(this.timer);
    this.cover && clearTimeout(this.cover);

    this.timer = null;
    this.cover = null;
    this.point = null;
    this.pausedAt = null;

    this.setter(0);
  }

  handle() {
    if (!this.pausedAt) return this.pause();
    return this.resume();
  }
}

export default Timer;
