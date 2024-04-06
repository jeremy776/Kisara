<script>
    import { page } from '$app/stores';

    const errmsg = {
        'detail': '',
        'description': '',
        "status": ''
    }
    if($page.status === 404) {
        errmsg.status = '404';
        errmsg.description = 'Oops, something went wrong.';
        errmsg.detail = 'Sorry, we couldn\'t find your page.';
    } else if($page.status === 500) {
        errmsg.status = '500';
        errmsg.description = 'Oops, '+$page.error?.message;
        errmsg.detail = 'Sorry, we couldn\'t process your request.\nPlease contact the administrator.';
    }
  </script>

<svelte:head>
    {#if errmsg.status === '404'}
        <title>404 - Page Not Found</title>
    {/if}
</svelte:head>

<div class="max-w-[50rem] mx-auto size-full h-[70%] flex items-center justify-center">
    <main id="content">
      <div class="text-center py-10 px-4 sm:px-6 lg:px-8">
        <h1 class="block text-7xl font-bold text-white sm:text-9xl">{errmsg.status}</h1>
        <p class="mt-3 text-gray-300">{errmsg.description}</p>
        <p class="text-gray-300">{errmsg.detail}</p>
        <div class="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
          <a href='/' class="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Home
          </a>
        </div>
      </div>
    </main>
  </div>