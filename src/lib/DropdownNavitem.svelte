<script>
    let hidden = true;
    import {slide} from "svelte/transition";
</script>

<li>
    <button on:click={() => hidden = !hidden}
            class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-semibold text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent border-b border-gray-100 dark:border-gray-700 lg:border-0">
        Timetables
        <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
        </svg>
    </button>
    <div class="relative">
        <!-- Dropdown menu -->
        {#if !hidden}
            <div id="dropdownNavbar"
                 class="absolute z-50 font-normal bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600" transition:slide>
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-400" on:click={()=>{hidden=true}} aria-labelledby="dropdownLargeButton">
                    <slot></slot>
                </ul>
            </div>
        {/if}
    </div>
</li>