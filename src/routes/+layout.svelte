<script>
    import Navbar from "$lib/Navbar.svelte"
    import Navitem from "$lib/Navitem.svelte"
    import navtitle from "$lib/navtitle.js"
</script>
<title>{$navtitle}</title>
<Navbar title="TPYC Info">
    <Navitem href="/">Home</Navitem>
    <Navitem href="/4a">4A Timetable</Navitem>
    <Navitem href="/4b">4B Timetable</Navitem>
    <Navitem href="/4c">4C Timetable</Navitem>
    <Navitem href="/4d">4D Timetable</Navitem>
    <Navitem href="/chem">Chem Tools</Navitem>
</Navbar>
<slot></slot>