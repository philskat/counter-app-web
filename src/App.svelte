<script lang="ts">
  import Tailwindcss from './Tailwindcss.svelte';
  import Header from './components/Header.svelte';
  import Counter from './components/Counter.svelte';
  import { writable } from 'svelte/store';

  let counter = writable(parseInt(localStorage.getItem('count') ?? '0'));

  function reset(): number {
    localStorage.setItem('count', '0');
    return 0;
  }
</script>

<Tailwindcss />

<Header reset={() => counter.update(reset)} />
<Counter bind:counter />
