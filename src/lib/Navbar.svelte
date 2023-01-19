<script>
    import {getDayClasses, getTodayDate, getTodayDay, getTodayDayString} from "$lib/helper.js";
    import dark from "$lib/dark.js";
    import {examTimetable, publicHolidays} from "$lib/constants.js";
    import Day from "$lib/Day.svelte";

    export let title;

    let shown = false;
    const today = new Date((new Date()).getTime());
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const longMonth = today.toLocaleString('en-US', { month: 'long' });
    const dd = String(today.getDate()).padStart(2, '0');
    const weekday = today.toLocaleDateString('en-US', {weekday: 'long'});
    const dayString = `${yyyy}-${mm}-${dd}`;
    const isHoliday = dayString in publicHolidays || weekday === 'Sun'
</script>

<!--<nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">-->
<!--    <div class="container-fluid">-->
<!--        <a class="navbar-brand" href="#">{title}</a>-->
<!--        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"-->
<!--                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">-->
<!--            <span class="navbar-toggler-icon"></span>-->
<!--        </button>-->
<!--        <div class="collapse navbar-collapse" id="navbarNavDropdown">-->
<!--            <ul class="navbar-nav me-auto mb-2 mb-lg-0">-->
<!--                <slot/>-->
<!--            </ul>-->
<!--        </div>-->
<!--    </div>-->
<!--</nav>-->


<header class="sticky top-0">
    <nav class="backdrop-blur-sm px-4 lg:px-6 py-2 bg-white/30 dark:bg-gray-700/30 border-b-slate-200 dark:border-b-slate-700 border-b">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <span class="flex items-center justify-between">
                <a href="#" class="self-center text-xl font-mono font-semibold whitespace-nowrap dark:text-white">TPYC Info</a>
            </span>
            <div class="flex items-center lg:order-2">
                <button on:click={()=>{$dark = !$dark}} type="button"
                        class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition">
                    {#if $dark}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
                        </svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                        </svg>

                    {/if}
                </button>
                <button on:click={() => shown = !shown} type="button"
                        class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clip-rule="evenodd"></path>
                    </svg>
                    <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div class="{shown ? '' : 'hidden'} transition justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                 id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-semibold font-sans lg:flex-row lg:space-x-8 lg:mt-0 lg:items-center">
                    <slot/>
                </ul>
            </div>
        </div>
    </nav>
    <div class="backdrop-blur-sm px-4 lg:px-6 py-2 bg-white/30 dark:bg-gray-700/30 shadow-md">
        <div class="flex gap-2 mx-auto max-w-screen-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>

            {dd} {longMonth} {yyyy}, {weekday} (<Day offset=0/>)
        </div>
    </div>
</header>