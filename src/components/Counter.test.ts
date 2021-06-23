import { fireEvent, render } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import Counter from './Counter.svelte';

describe('Counter component', () => {
  let localStorage: { [key: string]: string } = {};

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn((name, value) => (localStorage[name] = value)),
        getItem: jest.fn(name => localStorage[name]),
      },
      writable: true,
    });
  });

  const counter = writable(0);
  let count: HTMLElement;
  let increment: HTMLElement;
  let decrement: HTMLElement;
  beforeEach(() => {
    counter.set(0);
    localStorage = {};

    const { getByText } = render(Counter, { counter });

    count = getByText('0');
    increment = getByText('+');
    decrement = getByText('-');
  });

  it('Renders with correct value', () => {
    expect(count).toHaveTextContent('0');
  });

  it('Counter increments', async () => {
    await fireEvent.click(increment);

    expect(count).toHaveTextContent('1');
    expect(localStorage['count']).toBe('1');
  });

  it('Counter decrements', async () => {
    await fireEvent.click(increment);
    await fireEvent.click(increment);
    await fireEvent.click(decrement);

    expect(count).toHaveTextContent('1');
    expect(localStorage['count']).toBe('1');
  });

  it('Counter does not decrement below 0', async () => {
    await fireEvent.click(decrement);

    expect(count).toHaveTextContent('0');
    expect(localStorage['count']).toBe('0');
  });
});
