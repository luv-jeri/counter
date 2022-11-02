//-- test
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { cleanup, render, screen, act } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.useFakeTimers();
});
// import { act } from 'react-dom/test-utils';

afterEach(() => {
  cleanup();
});

// test('renders first layout', () => {
//   render(<App />);

//   const linkElement = screen.getAllByText(/Counter/i);

//   expect(linkElement).toHaveLength(2);

//   const button = screen.getByText(/Pause/i);
//   expect(button).toBeInTheDocument();
// });

it('should render the correct content', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Counter/i);
  expect(linkElement).toHaveLength(2);
});

it('should pause the timer on click of the button', () => {
  render(<App />);
  const button = screen.getByText(/Pause/i);
  expect(button).toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(1000);
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  const counter1 = screen.getByTestId('counter-1');
  const counter2 = screen.getByTestId('counter-2');
  expect(counter1).toHaveTextContent('1');
  expect(counter2).toHaveTextContent('1');
  expect(button).toHaveTextContent('Resume');
});

it('should pause the timer on click of the button after 10', () => {
  render(<App />);
  const button = screen.getByText(/Pause/i);
  expect(button).toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(11000);
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  const counter1 = screen.getByTestId('counter-1');
  const counter2 = screen.getByTestId('counter-2');

  expect(counter1).toHaveTextContent('11');
  expect(counter2).toHaveTextContent('10');
  expect(button).toHaveTextContent('Resume');
});

it('should resume the timer on click of the button', () => {
  render(<App />);

  const button = screen.getByText(/Pause/i);
  const counter1 = screen.getByTestId('counter-1');
  const counter2 = screen.getByTestId('counter-2');

  expect(button).toBeInTheDocument();
  expect(counter1).toHaveTextContent('0');
  expect(counter2).toHaveTextContent('0');

  act(() => {
    jest.advanceTimersByTime(1500);
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(counter1).toHaveTextContent('1');
  expect(counter2).toHaveTextContent('1');

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(counter1).toHaveTextContent('1');
  expect(counter2).toHaveTextContent('1');

  act(() => {
    jest.advanceTimersByTime(400);
  });

  expect(counter1).toHaveTextContent('1');
  expect(counter2).toHaveTextContent('1');

  act(() => {
    jest.advanceTimersByTime(200);
  });

  expect(counter1).toHaveTextContent('2');
  expect(counter2).toHaveTextContent('2');
});

it('should resume the timer on click of the button after 10', () => {
  render(<App />);

  const button = screen.getByText(/Pause/i);
  const counter1 = screen.getByTestId('counter-1');
  const counter2 = screen.getByTestId('counter-2');

  expect(button).toBeInTheDocument();
  expect(counter1).toHaveTextContent('0');
  expect(counter2).toHaveTextContent('0');

  act(() => {
    jest.advanceTimersByTime(11000);
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(button).toHaveTextContent('Resume');
  expect(counter1).toHaveTextContent('11');
  expect(counter2).toHaveTextContent('10');

  act(() => {
    jest.advanceTimersByTime(10000);
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(button).toHaveTextContent('Pause');
  expect(counter1).toHaveTextContent('11');
  expect(counter2).toHaveTextContent('10');

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(counter1).toHaveTextContent('12');
  expect(counter2).toHaveTextContent('10');
});

// it('render the counter after 1 second', () => {
//   render(<App />);
//    jest.useFakeTimers();

//   const linkElement = screen.getAllByText(/0/i);
//   expect(linkElement).toHaveLength(2);

//   const button = screen.getByText(/Pause/i);
//   expect(button).toBeInTheDocument();

//   act(() => {
//     jest.advanceTimersByTime(1000);
//   });

//   const linkElement2 = screen.getAllByText(/1/i);
//   expect(linkElement2).toHaveLength(2);
// });
