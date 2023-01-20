<script>
	import { fly } from 'svelte/transition';
	export let pathname = '';
</script>

{#key pathname}
	<div in:fly={{ x: -10, duration: 500, delay: 200 }} out:fly={{ x: 5, duration: 200 }}>
		<slot />
	</div>
{/key}