<script>
    import Navbar from "$lib/Navbar.svelte"
    import Navitem from "$lib/Navitem.svelte"
    import navtitle from "$lib/navtitle.js"
    import dark from "$lib/dark.js"

    import "../app.css";
    import DropdownNavitem from "$lib/DropdownNavitem.svelte";
    import PageTransitions from "$lib/PageTransitions.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
</script>
<title>{$navtitle}</title>

<div class:dark={$dark}>
    <div class="min-h-screen dark:bg-gray-800 dark:text-gray-300 transition">
        <Navbar title="TPYC Info" weatherData={data.weather}>
            <Navitem href="/">Home</Navitem>
            <Navitem href="/timetables/">Timetables</Navitem>
            <Navitem href="/bio/">Bio Image</Navitem>
            <Navitem href="/dictation/">Chinese Dict</Navitem>
            <Navitem href="/marks/">平均分計算器</Navitem>
        </Navbar>
        <PageTransitions pathname={data.pathname}>
            <slot></slot>
        </PageTransitions>
    </div>
</div>
