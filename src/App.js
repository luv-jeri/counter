import './App.css';
import { useState, useMemo, useEffect, useRef } from 'react';
import Wrapper from './components/wrapper';
function App() {
  

  return (
    <div className='App'>
       <Wrapper></Wrapper>
    </div>
  );
}

export default App;

// # Solutoin 2

// import './App.css';
// import { useState, useMemo, useEffect } from 'react';
// import Timer from './Timer';

// function App() {
//   const [counter, setCounter] = useState(0);
//   const [paused, setPaused] = useState(false);

//   const timer = useMemo(() => {
//     return new Timer(setCounter, 1000);
//   }, []);

//   useEffect(() => {
//     timer.start();
//     return () => {
//       timer.stop();
//     };
//   }, [timer]);

//   return (
//     <div className='App'>
//       <h1 data-testid='counter-1' id='counter-1'>
//         Counter:{counter}
//       </h1>
//       <h1 data-testid='counter-2' id='counter-2'>
//         Counter1:{counter < 10 ? counter : 10}
//       </h1>
//       <button
//         onClick={() => {
//           setPaused(timer.handle());
//         }}
//       >
//         {!paused ? 'Pause' : 'Resume'}
//       </button>
//     </div>
//   );
// }

// export default App;
