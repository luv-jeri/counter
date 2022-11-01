import React from 'react';

export default function Counter({ knob, count }) {
  return <h1>Counter : {knob ? (count < knob ? count : knob) : count}</h1>;
}
