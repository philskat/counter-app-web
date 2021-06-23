<script lang="ts">
  import { onMount, tick } from 'svelte';

  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/types/runtime/store';
  type ThemeSetting = 'dark' | 'light' | null;

  export let reset: () => void;

  let themeSetting: Writable<ThemeSetting>;

  onMount(() => {
    themeSetting = writable(readThemeSetting());
    themeSetting.subscribe(updateTheme);
  });

  function readThemeSetting(): ThemeSetting {
    let result: ThemeSetting;
    result = localStorage.getItem('theme') as ThemeSetting;

    if (!result) {
      result = matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      localStorage.setItem('theme', result);
    }

    return result;
  }

  function toggleTheme() {
    themeSetting.update(setting => {
      let result: ThemeSetting = setting === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', result);

      return result;
    });
  }

  async function updateTheme(setting: ThemeSetting) {
    const html = document.querySelector('html');

    if (setting === 'dark' && !html?.classList.contains('dark')) {
      html?.classList.add('dark');
    } else if (setting === 'light' && html?.classList.contains('dark')) {
      html?.classList.remove('dark');
    }
    await tick();
  }
</script>

<header
  class="px-4 py-2 pr-4 bg-primary text-primary-text flex justify-center items-center gap-6 shadow-md"
>
  <h1 class="flex-1 text-lg font-semibold">Counter App</h1>
  <button
    class="btn min-w-min focus:ring-offset-primary"
    on:click={toggleTheme}
  >
    <img class="h-8 filter invert" src="img/dark_mode.svg" alt="Theme" />
  </button>
  <a
    href="https://github.com/philskat/counter-app-web"
    target="_blank"
    class="btn min-w-min focus:ring-offset-primary"
  >
    <img src="img/GitHub.svg" alt="GitHub" class="h-8 filter invert" />
  </a>

  <button class="btn focus:ring-offset-primary" on:click={reset}>
    Reset
  </button>
</header>
