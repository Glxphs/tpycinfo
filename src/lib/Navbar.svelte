<script>
    import {getTodayDate, getTodayDayString} from "$lib/helper.js";
    import dark from "$lib/dark.js";

    export let title;

    let shown = false;
    let todayDate = getTodayDate(0)
    let todayDay = getTodayDayString(0)
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
    <nav class="backdrop-blur-sm px-4 lg:px-6 py-2 bg-white/30 dark:bg-gray-700/30 shadow-md">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <span class="flex items-center justify-between">
                <a href="#" class="self-center text-xl font-mono font-semibold whitespace-nowrap dark:text-white">TPYC Info</a>
            </span>
            <div class="flex items-center lg:order-2">
                <button on:click={()=>{$dark = !$dark}} type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
                    </svg>
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
</header>