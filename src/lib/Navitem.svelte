<script>
    import {page} from "$app/stores"

    export let href
    $: active = $page.url.pathname === href
</script>

{#if active}
    <li>
        <a {href}
           class="block py-2 pr-4 pl-3 text-white lg:text-primary-700 lg:bg-transparent lg:p-0 lg:rounded-lg bg-primary-700 dark:text-white"
           aria-current="page">
            <slot/>
        </a>
    </li>
{:else}
    <li>
        <a {href}
           class="block py-2 pr-4 pl-3 lg:bg-transparent lg:p-0 lg:rounded-lg text-gray-700 border-b border-gray-100 dark:border-gray-700 lg:border-0 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">
            <slot/>
        </a>
    </li>
{/if}