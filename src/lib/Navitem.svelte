<script>
  import { page } from "$app/stores"
  export let href
  $: active = $page.url.pathname === href
</script>

<li class="nav-item mx-3">
  <a class="nav-link" class:active aria-current="page" {href}>
    <slot />
  </a>
</li>