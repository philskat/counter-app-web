<script lang="ts">
  import type { Writable } from "svelte/store";

  export let counter: Writable<number>;

  function increment() {
    counter.update(cnt => {
      cnt++;
      localStorage.setItem('count', cnt.toString());
      return cnt;
    });
  }

  function decrement() {
    counter.update(cnt => {
      if (cnt > 0) {
        cnt--;
      }
      localStorage.setItem('count', cnt.toString());
      return cnt;
    })
  }
</script>

<div class="flex-1 flex flex-col items-center p-8">
  <div class="flex-1 flex items-center">
    <p 
      class="text-9xl select-none cursor-pointer"
      on:click={increment}
    >
      {$counter}
    </p>
  </div>

  <div class="w-full max-w-xl flex flex-col gap-4">
    <button 
      class="btn btn-primary"
      on:click={increment}
    >
      +
    </button>
    <button 
      class="btn btn-outlined"
      on:click={decrement}
    >
      -
    </button>
  </div>
</div>