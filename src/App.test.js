import { cleanup, render, screen, act, renderHook } from '@testing-library/react';
import App from './App';


beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  cleanup();
});

it('should render the correct content', () => {
  render(<App />);
  const button = screen.getByText(/Pause/i);

  const counter1 = screen.getByTestId('counter-1');
  const counter2 = screen.getByTestId('counter-2');

  const linkElement = screen.getAllByText(/Counter/i);

  expect(linkElement).toHaveLength(2);
  expect(counter1).toHaveTextContent('0');
  expect(counter2).toHaveTextContent('0');
  expect(button).toHaveTextContent('Pause');
});

it('should pause the timer on click of the button after 1000ms', () => {
  render(<App />);

  const button = screen.getByText(/Pause/i);

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

it('should pause the timer on click of the button after 11sec', () => {
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

it('should resume and contiue the timer on click of the button', () => {
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
  expect(button).toHaveTextContent('Resume');

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(button).toHaveTextContent('Pause');
  expect(counter1).toHaveTextContent('1');
  expect(counter2).toHaveTextContent('1');

  act(() => {
    jest.advanceTimersByTime(400);
  });

  //  Continues from its previous state
  expect(counter1).toHaveTextContent('1');
  expect(counter2).toHaveTextContent('1');

  act(() => {
    jest.advanceTimersByTime(200);
  });
  //  inc from its previous state
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

it('should preserve the values on rerender', () => {
  const { rerender } = render(<App />);

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

  rerender(<App />);

  expect(button).toHaveTextContent('Resume');
  expect(counter1).toHaveTextContent('11');
  expect(counter2).toHaveTextContent('10');
});

it('should clear the timer on unmount', () => {
  const { unmount } = render(<App />);

  // get the timer id
  const timerId = jest.getTimerCount();

  expect(timerId).toBe(1);

  unmount();

  expect(jest.getTimerCount()).toBe(0);

  render(<App />);

  expect(jest.getTimerCount()).toBe(1);
});