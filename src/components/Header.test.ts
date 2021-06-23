import Header from './Header.svelte';
import { fireEvent, render, waitFor } from '@testing-library/svelte';

let localStorage: { [key: string]: string } = {};

describe('Header component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(name => localStorage[name]),
        setItem: jest.fn((name, value) => (localStorage[name] = value)),
      },
      writable: true,
    });

    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn((media: string) => {
        return { matches: media == '(prefers-color-scheme: dark)' };
      }),
    });
  });

  afterEach(() => {
    localStorage = {};
  });

  it('Reads correct value for theme', async () => {
    window.localStorage.setItem('theme', 'dark');

    render(Header, { reset: jest.fn() });

    await waitFor(() =>
      expect(document.querySelector('html')).toHaveClass('dark')
    );

    expect(window.localStorage.getItem).toBeCalled();
    expect(localStorage['theme']).toBe('dark');
  });

  it('Reads media setting correct', async () => {
    render(Header, { reset: jest.fn() });

    await waitFor(() =>
      expect(document.querySelector('html')).toHaveClass('dark')
    );
    expect(window.matchMedia).toBeCalled();
    expect(localStorage['theme']).toBe('dark');
  });

  it('Toggle theme', async () => {
    const { getByAltText } = render(Header, { reset: jest.fn() });

    const themeToggle = getByAltText('Theme');

    expect(localStorage['theme']).toBe('dark');

    await fireEvent.click(themeToggle);

    expect(document.getElementsByTagName('html')[0]).not.toHaveClass('dark');
    expect(localStorage['theme']).toBe('light');
  });

  it('Calles reset function', async () => {
    const restFn = jest.fn(() => null);
    const { getByText } = render(Header, { reset: restFn });

    const restBtn = getByText('Reset');

    await fireEvent.click(restBtn);

    expect(restFn).toBeCalledTimes(1);
  });
});
