<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    * {
      -webkit-tap-highlight-color: transparent;
    }
  }

  @layer components {
    .btn {
      @apply min-w-16 h-8 bg-none border-none rounded-lg focus:outline-none font-medium uppercase text-sm transition
        cursor-pointer hover:bg-gray-200 hover:bg-opacity-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 focus:ring-offset-background
        active:bg-gray-600 dark:hover:bg-gray-600 dark:active:bg-gray-200 dark:focus:ring-offset-background-dark;
    }

    .btn-primary {
      @apply bg-primary text-primary-text shadow-md focus:ring-primary
        hover:bg-primary-light active:bg-primary-dark dark:hover:bg-primary-light dark:active:bg-primary-dark;
    }

    .btn-outlined {
      @apply border border-solid border-gray-700 border-opacity-25 dark:border-gray-200;
    }
  }
</style>